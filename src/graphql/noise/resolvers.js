import fastnoise from 'fastnoisejs'

export const resolver = {
  Query: {
    noise: async (_, { config }) => {
      const { sizeX, sizeY } = config

      const noise = fastnoise.Create(
        config.seed !== undefined ? config.seed : 1337
      )

      noise.SetNoiseType(
        config.algorithm ? fastnoise[config.algorithm] : fastnoise.Simplex
      )

      if (config.frequency !== undefined) {
        noise.SetFrequency(config.frequency)
      }
      if (config.interpolation) {
        noise.SetInterp(fastnoise[config.interpolation])
      }
      if (config.fractalOctaves !== undefined) {
        noise.SetFractalOctaves(config.fractalOctaves)
      }
      if (config.fractalLacunarity !== undefined) {
        noise.SetFractalLacunarity(config.fractalLacunarity)
      }
      if (config.fractalGain !== undefined) {
        noise.SetFractalGain(config.fractalGain)
      }
      if (config.fractalType) {
        noise.SetFractalType(fastnoise[config.fractalType])
      }
      if (config.cellularDistanceFunction) {
        noise.SetCellularDistanceFunction(
          fastnoise[config.cellularDistanceFunction]
        )
      }
      if (
        config.cellularDistanceIndex0 !== undefined &&
        config.cellularDistanceIndex1 !== undefined
      ) {
        noise.SetCellularDistance2Indices(
          config.cellularDistanceIndex0,
          config.cellularDistanceIndex1
        )
      }
      if (config.cellularJitter !== undefined) {
        noise.SetCellularJitter(config.cellularJitter)
      }
      if (config.gradientPerturbAmp !== undefined) {
        noise.SetGradientPerturbAmp(config.gradientPerturbAmp)
      }

      const cells = []
      for (let x = 0; x < sizeX; x++) {
        for (let y = 0; y < sizeY; y++) {
          cells.push(noise.GetNoise(x, y))
        }
      }
      return cells
    },
    algorithms: async () => [
      'Value',
      'ValueFractal',
      'Perlin',
      'PerlinFractal',
      'Simplex',
      'SimplexFractal',
      'Cellular',
      'WhiteNoise',
      'Cubic',
      'CubicFractal',
    ],
    interpolations: async () => ['Linear', 'Hermite', 'Quintic'],
    fractalTypes: async () => ['FBM', 'Billow', 'RigidMulti'],
    cellularDistanceFunctions: async () => [
      'Euclidean',
      'Manhattan',
      'Natural',
    ],
    cellularReturnTypes: async () => [
      'CellValue',
      'NoiseLookup',
      'Distance',
      'Distance2',
      'Distance2Add',
      'Distance2Sub',
      'Distance2Mul',
      'Distance2Div',
    ],
  },
}
