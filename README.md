# Pet Daily Calorie & Food Weight Calculator

A Next.js 14 calculator and programmatic SEO site for estimating daily calories, dry food grams, wet food grams, and cups for 100+ dog and cat breeds.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Method

- `RER = 70 × weight (kg)^0.75`
- MER factors vary by species, life stage, neuter status, and activity.
- Food weight is calculated from the calorie density entered from the package label.

This tool is educational and is not a substitute for veterinary diagnosis or an individualized nutrition plan.
