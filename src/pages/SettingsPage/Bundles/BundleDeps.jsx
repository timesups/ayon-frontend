import { BorderedSection, FormLayout, Dialog } from '@ynput/ayon-react-components'
import React, { useState } from 'react'
import BundleDepPackage from './BundleDepPackage'
import { useUpdateBundleMutation } from '@shared/api'
import { toast } from 'react-toastify'
import { useListDependencyPackagesQuery } from '@queries/dependencyPackages/getDependencyPackages'
import BundleDepsPicker from './BundleDepsPicker'
import { useTranslation } from 'react-i18next'

const BundleDeps = ({ bundle, onChange }) => {
  const { t } = useTranslation('settings')
  const initPackageForm = {
    platform: null,
    file: null,
  }
  const [updatePackageForm, setUpdatePackageForm] = useState(initPackageForm)

  // get dep packages from server
  const { data: { packages = [] } = {} } = useListDependencyPackagesQuery()

  const [updateBundle, { isLoading: isUpdating }] = useUpdateBundleMutation()

  const handleCloseForm = () => {
    setUpdatePackageForm(initPackageForm)
  }

  const setBundleDepPackage = async (platform, packageName) => {
    const newDeps = {
      ...bundle.dependencyPackages,
      [platform]: packageName || null,
    }

    if (onChange) {
      onChange(newDeps)
      handleCloseForm()
      return
    }

    // update bundle
    const patch = {
      ...bundle,
      dependencyPackages: newDeps,
    }

    // update bundle on server
    try {
      await updateBundle({ bundleName: bundle.name, bundlePatchModel: patch, patch })
      handleCloseForm()
      toast.success(t('bundleDepsUpdated'))
    } catch (error) {
      toast.error(t('failedUpdateBundleDeps'))
    }
  }

  const platforms = [
    {
      id: 'windows',
      label: t('windows'),
    },
    {
      id: 'linux',
      label: t('linux'),
    },
    {
      id: 'darwin',
      label: t('macos'),
    },
  ]

  return (
    <>
      <Dialog
        header={t('updateDependencyPackage')}
        isOpen={!!updatePackageForm.platform}
        onClose={handleCloseForm}
        size="sm"
        style={{ width: '500px' }}
      >
        <BundleDepsPicker
          packages={packages}
          value={updatePackageForm}
          initPackage={bundle?.dependencyPackages?.[updatePackageForm?.platform] || null}
          onChange={(v) => setUpdatePackageForm({ ...updatePackageForm, file: v[0] || null })}
          isUpdating={isUpdating}
          onSubmit={() => setBundleDepPackage(updatePackageForm?.platform, updatePackageForm?.file)}
          onCancel={handleCloseForm}
        />
      </Dialog>
      <BorderedSection title={t('dependencyPackages')} autoHeight showHeader withPadding>
        {bundle && (
          <FormLayout>
            {platforms.map((platform) => (
              <BundleDepPackage
                key={platform.id}
                label={platform.label}
                onEdit={() =>
                  setUpdatePackageForm({
                    platform: platform.id,
                    file: bundle?.dependencyPackages?.[platform.id] || null,
                  })
                }
              >
                {bundle?.dependencyPackages?.[platform.id]}
              </BundleDepPackage>
            ))}
          </FormLayout>
        )}
      </BorderedSection>
    </>
  )
}

export default BundleDeps
