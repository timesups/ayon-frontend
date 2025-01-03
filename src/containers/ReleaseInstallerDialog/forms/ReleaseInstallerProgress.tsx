import { FC } from 'react'
import { EventWithProgress } from '../hooks/useInstallRelease'
import styled from 'styled-components'
import { Button, Toolbar } from '@ynput/ayon-react-components'
import { useTranslation } from 'react-i18next'
import "@/i18n/config"
const StyledProgress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`

const ProgressBar = styled.div<{ $progress: number }>`
  width: 100%;
  height: 12px;
  background-color: var(--md-sys-color-surface-container);
  border-radius: 6px;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    width: ${({ $progress }) => $progress * 100}%;
    height: 100%;
    background-color: ${({ $progress }) =>
      $progress === 1 ? 'var(--md-sys-color-tertiary)' : 'var(--md-sys-color-primary)'};
    border-radius: 6px;
    transition: width 0.3s;
  }
`

interface ReleaseInstallerProgressProps {
  progress: EventWithProgress[]
  onFinish: (restart: boolean) => void
}

export const ReleaseInstallerProgress: FC<ReleaseInstallerProgressProps> = ({
  progress,
  onFinish,
}) => {
  // get currently installing event
  const currentInstalling = progress.find((event) => event.status === 'in_progress')
  const isFinished = progress.every((event) => event.status === 'finished')

  // total size of all events
  const totalSize = progress.reduce((acc, event) => {
    return acc + event.size
  }, 0)

  console.log(progress)

  return (
    <StyledProgress>
      <ProgressBar $progress={calculateTotalProgress(progress, totalSize)} />
      {isFinished
        ? 'Installed successfully. Restart server to apply changes.'
        : getInstallMessage(currentInstalling)}
      {isFinished && (
        <Toolbar>
          <Button icon="snooze" onClick={() => onFinish(false)}>
            Restart later (snooze)
          </Button>
          <Button variant="filled" disabled={!isFinished} onClick={() => onFinish(true)}>
            Restart now
          </Button>
        </Toolbar>
      )}
    </StyledProgress>
  )
}

const getInstallMessage = (event?: EventWithProgress): string => {
  const {t} = useTranslation()
  if (!event) return t("Installing release...")
  return `${t("Installing")}: ` + event.label + '...'
}

// take all the events and calculate the total progress based on progress field
const calculateTotalProgress = (progress: EventWithProgress[], total: number): number => {
  // total progress of all events
  const progressTotal = progress.reduce((acc, event) => {
    if (event.status === 'finished') return acc + event.size
    return acc + ((event.progress || 0) / 100) * event.size
  }, 0)

  console.log(progressTotal < total)

  return Math.round((progressTotal / total) * 100) / 100
}
