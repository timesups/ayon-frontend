import { useListProjectsQuery } from '@queries/project/getProject'
import { useMemo } from 'react'
import { Dropdown } from '@ynput/ayon-react-components'
import { useTranslation } from 'react-i18next'
import "@/i18n/config"
const ProjectDropdown = ({ projectName, setProjectName, disabled, style }) => {
  const {t} = useTranslation()
  const { data, isLoading, isError } = useListProjectsQuery({ active: true })

  const projectOptions = useMemo(() => {
    if (isLoading || isError) return []
    return data.map((i) => ({ value: i.name }))
  }, [data])

  let dropwdownStyle = {}
  if (style) dropwdownStyle = style
  else dropwdownStyle.flexGrow = 1

  return (
    <Dropdown
      value={projectName ? [projectName] : null}
      options={projectOptions}
      onChange={(e) => setProjectName(e[0])}
      placeholder={t("Select a project")}
      style={dropwdownStyle}
      disabled={disabled}
    />
  )
}

export default ProjectDropdown
