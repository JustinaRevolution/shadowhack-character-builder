import { useState } from 'react'
import { useCharacter } from './hooks/useCharacter'
import ProgressBar from './components/ProgressBar'
import MatrixRain from './components/MatrixRain'
import NameStep from './components/steps/NameStep'
import BackgroundStep from './components/steps/BackgroundStep'
import RoleStep from './components/steps/RoleStep'
import ContactStep from './components/steps/ContactStep'
import ClassStep from './components/steps/ClassStep'
import AttributesStep from './components/steps/AttributesStep'
import LifestyleStep from './components/steps/LifestyleStep'
import GearStep from './components/steps/GearStep'
import CharacterSheetStep from './components/steps/CharacterSheetStep'
import { calcHP, calcAC, calcKarma } from './utils/derived'

import classes from '../data/classes.json'
import backgrounds from '../data/backgrounds.json'
import roles from '../data/roles.json'
import contacts from '../data/contacts.json'
import cyberware from '../data/cyberware.json'
import gear from '../data/gear.json'
import spells from '../data/spells.json'

const ALL_STEPS = [
  { key: 'name',       label: 'Name' },
  { key: 'class',      label: 'Class' },
  { key: 'attributes', label: 'Attributes' },
  { key: 'background', label: 'Background' },
  { key: 'role',       label: 'Role' },
  { key: 'contact',    label: 'Contact' },
  { key: 'lifestyle',  label: 'Lifestyle' },
  { key: 'gear',       label: 'Gear' },
  { key: 'sheet',      label: 'Character Sheet' },
]

export default function App() {
  const { character, setField, setAttribute, setSpell, removeSpell, reset } = useCharacter()
  const [stepIndex, setStepIndex] = useState(0)
  const [glitching, setGlitching] = useState(false)

  const currentStep = ALL_STEPS[stepIndex]

  function triggerGlitch() {
    setGlitching(true)
    setTimeout(() => setGlitching(false), 600)
  }

  function canProceed() {
    switch (currentStep.key) {
      case 'name':       return character.name.trim().length > 0
      case 'class':      return !!character.characterClass && hasCompletedSubChoice()
      case 'attributes': {
        const assigned = Object.values(character.attributes).filter(v => v !== null)
        const pool = [3, 3, 2, 1, 0, -1].sort().join()
        const actual = [...assigned].sort().join()
        return assigned.length === 6 && actual === pool
      }
      case 'background': return !!character.background
      case 'role':       return !!character.role
      case 'contact':    return !!character.contact
      case 'lifestyle':  return !!character.lifestyle && (character.lifestyle === 'medium' || !!character.cyberware)
      case 'gear':       return !!character.weapon && !!character.armor
      case 'sheet':      return false
      default:           return false
    }
  }

  function hasCompletedSubChoice() {
    const sub = character.characterClass?.sub_choice
    if (!sub) return true
    if (sub.type === 'firearm')       return !!character.subChoice?.value
    if (sub.type === 'fighting_move') return !!character.subChoice?.value
    if (sub.type === 'elemental')     return !!character.subChoice?.element && !!character.subChoice?.spellStat
    if (sub.type === 'spells')        return character.spells.length >= sub.count
    return true
  }

  function handleClassSelect(cls) {
    setField('characterClass', cls)
    setField('subChoice', null)
    setField('spells', [])
  }

  function next() {
    if (stepIndex < ALL_STEPS.length - 1) {
      triggerGlitch()
      setStepIndex(i => i + 1)
    }
  }

  function back() {
    if (stepIndex > 0) {
      triggerGlitch()
      setStepIndex(i => i - 1)
    }
  }

  function handleStartOver() {
    reset()
    setStepIndex(0)
  }

  function renderStep() {
    switch (currentStep.key) {
      case 'name':
        return <NameStep
          name={character.name}
          playerName={character.playerName}
          onNameChange={v => setField('name', v)}
          onPlayerNameChange={v => setField('playerName', v)}
        />
      case 'class':
        return <ClassStep
          classes={classes}
          selected={character.characterClass}
          subChoice={character.subChoice}
          spells={character.spells}
          onSelect={handleClassSelect}
          onSubChoiceChange={v => setField('subChoice', v)}
          onSpellToggle={spell => {
            const has = character.spells.some(s => s.name === spell.name)
            has ? removeSpell(spell.name) : setSpell(spell)
          }}
          allSpells={spells}
        />
      case 'attributes': {
        const dex = character.attributes.DEX ?? 0
        const hp = calcHP(character.characterClass)
        const ac = calcAC(character.armor, dex, character.cyberware)
        const karma = calcKarma(character.cyberware)
        return <AttributesStep
          attributes={character.attributes}
          onAttributeChange={setAttribute}
          hp={hp}
          ac={ac}
          karma={karma}
        />
      }
      case 'background':
        return <BackgroundStep
          backgrounds={backgrounds}
          selected={character.background}
          onSelect={b => setField('background', b)}
        />
      case 'role':
        return <RoleStep
          roles={roles}
          selected={character.role}
          onSelect={r => setField('role', r)}
        />
      case 'contact':
        return <ContactStep
          contacts={contacts}
          selected={character.contact}
          onSelect={c => setField('contact', c)}
        />
      case 'lifestyle': {
        const karma = calcKarma(character.cyberware)
        return <LifestyleStep
          lifestyle={character.lifestyle}
          cyberware={character.cyberware}
          cyberwareOptions={cyberware}
          onLifestyleChange={v => setField('lifestyle', v)}
          onCyberwareChange={v => setField('cyberware', v)}
          karma={karma}
        />
      }
      case 'gear': {
        const dex = character.attributes.DEX ?? 0
        const ac = calcAC(character.armor, dex, character.cyberware)
        return <GearStep
          weapons={gear.weapons}
          armors={gear.armor}
          selectedWeapon={character.weapon}
          selectedArmor={character.armor}
          onWeaponChange={v => setField('weapon', v)}
          onArmorChange={v => setField('armor', v)}
          ac={ac}
        />
      }
      case 'sheet':
        return <CharacterSheetStep character={character} onStartOver={handleStartOver} />
      default:
        return <div className="text-[#008f11]">Step: {currentStep.label}</div>
    }
  }

  const isLastStep = stepIndex === ALL_STEPS.length - 1

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <MatrixRain />
      <div className="scanlines" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold text-[#00ff41] glitch text-glow tracking-[0.3em]"
            data-text="SHADOWHACK"
          >
            SHADOWHACK
          </h1>
          <p className="text-[#008f11] mt-1 text-sm">Character Builder</p>
        </div>

        <ProgressBar steps={ALL_STEPS.map(s => s.label)} current={stepIndex} />

        <div className={`mb-8 min-h-96 ${glitching ? 'glitching' : ''}`}>
          {renderStep()}
        </div>

        <div className="flex justify-between items-center border-t border-[#003b00] pt-6">
          <button
            onClick={back}
            disabled={stepIndex === 0}
            className="px-6 py-2 bg-black/80 hover:bg-zinc-900 border border-[#003b00] rounded text-green-400 disabled:opacity-30 transition-colors glitch-hover"
          >
            Back
          </button>
          {!isLastStep && (
            <button
              onClick={next}
              disabled={!canProceed()}
              className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded text-black font-semibold disabled:opacity-30 transition-colors glitch-hover"
            >
              {stepIndex === ALL_STEPS.length - 2 ? 'Finish →' : 'Next →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
