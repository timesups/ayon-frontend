import { useState, useMemo } from 'react'
import { toast } from 'react-toastify'
import { rcompare } from 'semver'
import { Dialog, Dropdown } from '@ynput/ayon-react-components'
import {
  FormLayout,
  FormRow,
  Divider,
  Spacer,
  InputText,
  InputTextarea,
  SaveButton,
  Button,
  Toolbar,
} from '@ynput/ayon-react-components'
import VariantSelector from '@containers/AddonSettings/VariantSelector'
import { useCreateServiceMutation } from '@queries/services/updateServices'
import { useGetServiceAddonsQuery, useGetServiceHostsQuery } from '@queries/services/getServices'
import { useTranslation } from 'react-i18next'
import "@/i18n/config"
const NewServiceDialog = ({ onHide }) => {
  const {t} = useTranslation()
  const [serviceName, setServiceName] = useState('')
  const [selectedAddon, setSelectedAddon] = useState(null)
  const [selectedVersion, setSelectedVersion] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedHost, setSelectedHost] = useState(null)
  const [settingsVariant, setSettingsVariant] = useState('production')
  const [storages, setStorages] = useState('')

  const { data: addonData = [] } = useGetServiceAddonsQuery()
  const { data: hostData = [] } = useGetServiceHostsQuery()

  const hostOptions = useMemo(() => {
    return hostData.map((h) => {
      return { value: h.name, label: h.name }
    })
  }, [hostData])

  const addonOptions = useMemo(() => {
    return addonData.map((ad) => {
      return { value: ad, label: ad.title }
    })
  }, [addonData])

  const versionOptions = useMemo(() => {
    if (!selectedAddon) return []
    return Object.keys(selectedAddon.versions)
      .filter((v) => Object.keys(selectedAddon.versions[v].services || []).length)
      .sort((a, b) => rcompare(a, b))
      .map((v) => {
        return { value: v, label: `${selectedAddon.title} ${v}` }
      })
  }, [selectedAddon?.name])

  const serviceOptions = useMemo(() => {
    if (!selectedVersion) return []
    const services = selectedAddon.versions[selectedVersion]?.services || {}
    return Object.keys(services).map((v) => {
      return { value: v, label: v }
    })
  }, [selectedVersion, selectedAddon?.name])

  const [createService, { isLoading }] = useCreateServiceMutation()

  const submit = async () => {
    /*
    volumes: list[str] | None = Field(None, title="Volumes", example=["/tmp:/tmp"])
    ports: list[str] | None = Field(None, title="Ports", example=["8080:8080"])
    mem_limit: str | None = Field(None, title="Memory Limit", example="1g")
    user: str | None = Field(None, title="User", example="1000")
    env: dict[str, Any] = Field(default_factory=dict)
    */

    const serviceConfig = {
      volumes: [],
      ports: [],
      mem_limit: null,
      user: null,
      env: {},
    }
    if (settingsVariant !== 'production') {
      serviceConfig.env.AYON_DEFAULT_SETTINGS_VARIANT = settingsVariant
    }

    if (storages) {
      serviceConfig.volumes = storages.split('\n').map((s) => s.trim())
    }

    const serviceData = {
      addonName: selectedAddon.name,
      addonVersion: selectedVersion,
      service: selectedService,
      hostname: selectedHost,
      config: serviceConfig,
    }

    try {
      await createService({ serviceName, data: serviceData }).unwrap()

      onHide()

      toast.success(`Service spawned`)
    } catch (error) {
      console.log(error)
      toast.error(`Unable to spawn service: ${error.detail}`)
    }
  }

  const canSubmit =
    selectedAddon?.name && selectedVersion && selectedService && selectedHost && serviceName?.length

  const footer = (
    <Toolbar>
      <Spacer />
      <Button label="Cancel" onClick={onHide} variant="text" />
      <SaveButton label="Spawn" active={canSubmit} saving={isLoading} onClick={submit} />
    </Toolbar>
  )

  return (
    <Dialog
      isOpen={true}
      header="Spawn a new service"
      onClose={onHide}
      footer={footer}
      style={{ width: 550, maxHeight: '600px', zIndex: 999 }}
      size="lg"
    >
      <FormLayout>
        <FormRow label={t("Host")}>
          <Dropdown
            options={hostOptions}
            value={[selectedHost]}
            onChange={(e) => setSelectedHost(e[0])}
            placeholder={t("Select a host...")}
          />
        </FormRow>

        <FormRow label={t("Addon name")}>
          <Dropdown
            options={addonOptions}
            value={[selectedAddon]}
            onChange={(e) => {
              setSelectedAddon(e[0])
              setSelectedVersion(null)
              setSelectedService(null)
              setServiceName('')
            }}
            placeholder={t("Select an addon...")}
          />
        </FormRow>

        <FormRow label={t("Addon version")}>
          <Dropdown
            options={versionOptions}
            value={[selectedVersion]}
            onChange={(e) => setSelectedVersion(e[0])}
            placeholder={t("Select a version...")}
          />
        </FormRow>

        <FormRow label={t("Service")}>
          <Dropdown
            options={serviceOptions}
            value={[selectedService]}
            onChange={(e) => {
              setSelectedService(e[0])
              setServiceName(e[0])
            }}
            disabled={!selectedVersion}
            placeholder={t("Select a service...")}
          />
        </FormRow>

        <FormRow label={t("Service name")}>
          <InputText value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
        </FormRow>
      </FormLayout>

      <Divider>{t("Advanced settings")}</Divider>

      <FormLayout>
        <FormRow label={t("Settings variant")}>
          <VariantSelector
            addonName={selectedAddon?.name}
            addonVersion={selectedVersion}
            variant={settingsVariant}
            setVariant={setSettingsVariant}
          />
        </FormRow>

        <FormRow label={t("Storages")}>
          <InputTextarea
            value={storages}
            style={{ minHeight: 80 }}
            onChange={(e) => setStorages(e.target.value)}
            placeholder="/local/path:/container/path"
          />
        </FormRow>
      </FormLayout>
    </Dialog>
  )
}

export default NewServiceDialog
