import { useState, useEffect } from "react"

function getRandomId() {
  return Math.floor(Math.random() * (306146528 - 110 + 1)) + 110
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function App() {
  const [observation, setObservation] = useState(null)
  const [options, setOptions] = useState([])
  const [revealed, setRevealed] = useState(false)
  const [loading, setLoading] = useState(false)

  const [mode, setMode] = useState("all") // all | birds | plants

  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)

  function matchesMode(obs) {
    const t = obs?.taxon?.iconic_taxon_name
    if (mode === "birds") return t === "Aves"
    if (mode === "plants") return t === "Plantae"
    return true
  }

  async function fetchValidObservation() {
    while (true) {
      const id = getRandomId()
      try {
        const res = await fetch(`https://api.inaturalist.org/v1/observations/${id}`)
        const data = await res.json()
        const obs = data.results?.[0]

        if (
          obs &&
          obs.quality_grade === "research" &&
          obs.photos?.length > 0 &&
          obs.taxon &&
          matchesMode(obs)
        ) {
          return obs
        }
      } catch {}
    }
  }

  async function fetchObservation() {
    setLoading(true)
    setRevealed(false)

    const mainObs = await fetchValidObservation()
    const correct = mainObs.taxon

    const distractors = []

    while (distractors.length < 3) {
      const obs = await fetchValidObservation()
      const name = obs.taxon?.name
      if (name && name !== correct.name && !distractors.includes(name)) {
        distractors.push(name)
      }
    }

    setObservation(mainObs)
    setOptions(shuffle([correct.name, ...distractors]))
    setLoading(false)
  }

  useEffect(() => {
    fetchObservation()
  }, [mode])

  function handleChoice(choice) {
    const correct = observation.taxon.name
    const isCorrect = choice === correct

    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))

    setStreak(prev => {
      const next = isCorrect ? prev + 1 : 0
      if (next > bestStreak) setBestStreak(next)
      return next
    })

    setRevealed(true)
  }

  if (loading || !observation) {
    return <div style={{ padding: 20 }}>Loading...</div>
  }

  return (
    <div style={{ padding: 20, textAlign: "center" }}>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setMode("all")} disabled={mode === "all"}>All</button>
        <button onClick={() => setMode("birds")} disabled={mode === "birds"}>Birds</button>
        <button onClick={() => setMode("plants")} disabled={mode === "plants"}>Plants</button>
      </div>

      <h3>
        Score: {score.correct}/{score.total} | Streak: {streak} | Best: {bestStreak}
      </h3>

      <img
        src={observation.photos[0].url.replace("square", "large")}
        style={{ maxWidth: 400, borderRadius: 12 }}
      />

      {!revealed ? (
        <div>
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => handleChoice(opt)}
              style={{ display: "block", margin: 10 }}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2>{observation.taxon.preferred_common_name}</h2>
          <p>{observation.taxon.name}</p>
          <button onClick={fetchObservation}>Next</button>
        </div>
      )}
    </div>
  )
}
