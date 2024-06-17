'use client'

import {ChallengePreferences} from '@prisma/client'
import React, {useState} from 'react'
import {Button} from './ui/button'
import {Switch} from './ui/switch'
import DifficultyCard from './DifficultyCard'
import axios from 'axios'
import toast from 'react-hot-toast'

const difficulties = [
  {
    id: 'EASY',
    level: 'Easy',
    description:
      'Este nível de desafio é para pessoas que estão começando a treinar. Receba 3 desafios por dia (7:30, 12:00, e 17:30).',
  },
  {
    id: 'MEDIUM',
    level: 'Medium',
    description:
      'Este nível de desafio é para pessoas que já têm alguma experiência treinando. Receba 4 desafios por dia (7:00, 12:00, 17:00, e 20:00).',
  },
  {
    id: 'HARD',
    level: 'Hard',
    description:
      'Este nível de desafio é para pessoas que já são mais experientes. Receba 5 desafios por dia (6:00, 9:00, 12:00, 17:00, e 20:00).',
  },
]

type Difficulties = 'EASY' | 'MEDIUM' | 'HARD'

interface ProfileContainerProps {
  challengePreferences: ChallengePreferences
}

function ProfileContainer({challengePreferences}: ProfileContainerProps) {
  const [saving, setSaving] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    challengePreferences.challengeId
  )
  const [sendNotifications, setSendNotifications] = useState(
    challengePreferences.sendNotifications
  )

  const handleToggleNotifications = () => {
    setSendNotifications((prev) => !prev)
  }

  const handleSelectDifficulty = (difficultyId: Difficulties) => {
    setSelectedDifficulty(difficultyId)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await axios.post<{
        success: boolean
        data?: ChallengePreferences
        message?: string
      }>('/api/challenge-preferences', {
        id: challengePreferences.id,
        challengeId: selectedDifficulty,
        sendNotifications,
      })

      if (!response.data.success || !response.data.data) {
        console.error(response.data.message ?? 'Algo deu errado')
        toast.error(response.data.message ?? 'Algo deu errado')
        return
      }

      toast.success('Preferences saved!')
    } catch (error) {
      console.error(error)
      toast.error('Algo deu errado. Por favor, tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">Nível de desafio</h1>
        <Button onClick={handleSave}>{saving ? 'Saving...' : 'Save'}</Button>
      </div>
      <div className="mb-4 flex flex-row items-center justify-between rounded-lg p-4 shadow">
        <div>
          <h3 className="text-lg font-medium  text-gray-900">Notificações</h3>
          <p>
            Receba notificações quando novos desafios estiverem disponíveis.
          </p>
        </div>
        <Switch
          checked={sendNotifications}
          onCheckedChange={handleToggleNotifications}
        />
      </div>
      <div className="grid-col-1 grid gap-4 md:grid-cols-3">
        {difficulties.map((difficulty) => (
          <DifficultyCard
            key={difficulty.id}
            level={difficulty.level}
            description={difficulty.description}
            selected={difficulty.id === selectedDifficulty}
            onSelect={() =>
              handleSelectDifficulty(difficulty.id as Difficulties)
            }
          />
        ))}
      </div>
    </div>
  )
}

export default ProfileContainer
