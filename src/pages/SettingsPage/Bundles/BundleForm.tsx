import { BorderedSection, InputSwitch, InputText } from '@ynput/ayon-react-components'
import React, { useMemo } from 'react'
import { SplitterPanel } from 'primereact/splitter'
import { format, isValid } from 'date-fns'
import BundlesAddonList from './BundlesAddonList'
import * as BundleStyled from './Bundles.styled'
import * as Styled from './BundleForm.styled'
import InstallerSelector from './InstallerSelector'
import { AddonSearchInput } from './AddonSearchInput'
import { useAppSelector } from '@state/store'
import { useGetUsersQuery } from '@shared/api'
import { FieldLabel } from '@shared/components/DetailsPanelDetails'
import type { Addon } from './types'
import { useTranslation } from 'react-i18next'

type Installer = { version: string; platforms?: string[] }

type BundleFormData = {
  name?: string
  installerVersion?: string
  isProject?: boolean
  isDev?: boolean
  activeUser?: string
  addons?: Record<string, string | null>
  addonDevelopment?: Record<string, { enabled?: boolean; path?: string }>
}

type BundleFormProps = {
  formData: BundleFormData | null
  setFormData: React.Dispatch<React.SetStateAction<BundleFormData>>
  isNew: boolean
  isDev?: boolean
  installers?: Installer[]
  children?: React.ReactNode
  addonTools?: React.ReactNode
  selectedAddons: Addon[]
  setSelectedAddons: (sel: any) => void
  onAddonDevChange?: (
    addonNames: string[],
    payload: { value: any; key: 'enabled' | 'path' },
  ) => void
  developerMode?: boolean
  addonListRef?: any
  onAddonAutoUpdate?: (addon: string, version: string | null) => void
  createdAt?: string
  updatedAt?: string
}

const formatTimestamp = (value?: string, unknownLabel = 'Unknown') => {
  const date = value ? new Date(value) : null
  return date && isValid(date) ? format(date, 'PPpp') : unknownLabel
}

const ReadOnlyRow = ({ name, title, value }: { name: string; title: string; value: string }) => (
  <Styled.FieldRow>
    <FieldLabel name={name} data={{ title }} />
    <Styled.FieldText>{value}</Styled.FieldText>
  </Styled.FieldRow>
)

const BundleForm: React.FC<BundleFormProps> = ({
  formData,
  setFormData,
  isNew,
  isDev,
  installers = [],
  children,
  addonTools,
  selectedAddons,
  setSelectedAddons,
  onAddonDevChange,
  developerMode,
  addonListRef,
  onAddonAutoUpdate,
  createdAt,
  updatedAt,
}) => {
  const { t } = useTranslation('settings')
  const showNameError = formData && !formData?.name && isNew
  const currentUser = useAppSelector((state) => state.user.name)
  const { data: users = [], isLoading } = useGetUsersQuery({ selfName: currentUser }) as any
  const devs = users?.filter((u: any) => u.isDeveloper)

  const devSelectOptions = useMemo(
    () =>
      devs.map((d: any) => ({
        name: d.name,
        fullName: d.attrib?.fullName || d.name,
        avatarUrl: d.name && `/api/users/${d.name}/avatar`,
      })),
    [devs],
  )

  if (!formData) return null

  const unknownLabel = t('unknown')
  const dateRows = (
    <>
      <ReadOnlyRow
        name="createdAt"
        title={t('createdAt')}
        value={formatTimestamp(createdAt, unknownLabel)}
      />
      <ReadOnlyRow
        name="updatedAt"
        title={t('updatedAt')}
        value={formatTimestamp(updatedAt, unknownLabel)}
      />
    </>
  )

  const editableDetails = (
    <BorderedSection title={t('details')} autoHeight showHeader withPadding>
      <Styled.FieldRow>
        <FieldLabel name="bundleName" data={{ title: t('bundleName') }} id="bundle-name-label" />
        <div className="field">
          <Styled.BundleNameInput $hasError={!!showNameError}>
            <InputText
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isDev}
              id="bundle-name"
              aria-labelledby="bundle-name-label"
            />
          </Styled.BundleNameInput>
        </div>
      </Styled.FieldRow>
      <Styled.FieldRow>
        <FieldLabel name="installerVersion" data={{ title: t('launcherVersion') }} />
        <div className="field">
          <Styled.FieldGrow>
            <InstallerSelector
              value={formData.installerVersion ? [formData.installerVersion] : []}
              options={installers}
              onChange={(e) => setFormData({ ...formData, installerVersion: e[0] })}
            />
          </Styled.FieldGrow>
        </div>
      </Styled.FieldRow>
      {developerMode && !isDev && (
        <Styled.FieldRow>
          <FieldLabel name="devBundle" data={{ title: t('devBundle') }} />
          <div className="field">
            <InputSwitch
              checked={formData.isDev}
              onChange={() =>
                setFormData({ ...formData, isDev: !formData.isDev, isProject: false })
              }
            />
          </div>
        </Styled.FieldRow>
      )}
      {(isDev || developerMode) && (
        <Styled.FieldRow>
          <FieldLabel name="activeUser" data={{ title: t('assignedDev') }} />
          <div className="field">
            {(() => {
              const DevSelect: any = BundleStyled.DevSelect
              return (
                <DevSelect
                  editor
                  emptyMessage={t('assignDeveloper')}
                  value={[formData.activeUser || '']}
                  options={devSelectOptions}
                  disabled={isLoading || !formData.isDev}
                  multiSelect={false}
                  onChange={(v: string[]) =>
                    setFormData((prev) => ({
                      ...prev,
                      activeUser: v[0],
                    }))
                  }
                />
              )
            })()}
            {(() => {
              const BadgeButton: any = BundleStyled.BadgeButton
              return (
                <BadgeButton
                  label={t('assignToMe')}
                  $hl={'developer-surface'}
                  icon={'person_pin_circle'}
                  disabled={formData.activeUser === currentUser || isLoading || !formData.isDev}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      activeUser: currentUser,
                    }))
                  }}
                />
              )
            })()}
          </div>
        </Styled.FieldRow>
      )}
      {createdAt && dateRows}
    </BorderedSection>
  )

  const readOnlyDetails = (
    <BorderedSection title={t('details')} autoHeight showHeader withPadding>
      <ReadOnlyRow name="name" title={t('name')} value={formData.name || ''} />
      <ReadOnlyRow
        name="installerVersion"
        title={t('launcherVersion')}
        value={formData.installerVersion || t('none')}
      />
      {dateRows}
    </BorderedSection>
  )

  return (
    <Styled.FormSplitter layout="horizontal" stateKey="bundles-form-splitter" stateStorage="local">
      <SplitterPanel size={65} style={{ minWidth: 400 }}>
        <Styled.AddonsPanel>
          <Styled.AddonsHeader>
            {isNew ? addonTools : <Styled.AddonsTitle>{t('bundleAddons')}</Styled.AddonsTitle>}
            <AddonSearchInput />
          </Styled.AddonsHeader>
          <Styled.AddonsList>
            <BundlesAddonList
              readOnly={!isNew}
              {...{ formData, setFormData }}
              setSelected={setSelectedAddons}
              selected={selectedAddons}
              isDev={isDev || formData.isDev}
              onDevChange={onAddonDevChange}
              ref={addonListRef}
              onAddonAutoUpdate={onAddonAutoUpdate}
            />
          </Styled.AddonsList>
        </Styled.AddonsPanel>
      </SplitterPanel>
      <SplitterPanel size={35} style={{ minWidth: 300 }}>
        <Styled.DetailsCards>
          {isNew ? editableDetails : readOnlyDetails}
          {children}
        </Styled.DetailsCards>
      </SplitterPanel>
    </Styled.FormSplitter>
  )
}

export default BundleForm
