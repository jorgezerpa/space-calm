type CameraPostionType = {
    position: {
      x: number,
      y: number,
      z: number
    },
    rotation: {
      x: number,
      y: number,
      z: number
    },
    startingTime: number
  };
  
  type CameraPositionsType = {
    [key: string]: CameraPostionType
  };
  
export const cameraPositions: CameraPositionsType = {
    "initial": {
      position: { x: -0.00, y: 21.02, z: 0.00 },
      rotation: { x: -1.57, y: -0.00, z: -0.08 },
      startingTime: 0
    },
    "view1": {
      position: { x: -1.35, y: 2.86, z: 5.87 },
      rotation: { x: -0.00, y: -0.11, z: -0.00 },
      startingTime: 2
    },
    "view2": {
      position: { x: 0.00, y: 0.00, z: 3.49 },
      rotation: { x: -0.00, y: 0.00, z: 0.00 },
      startingTime: 4
    },
    "view3": {
      position: { x: -0.03, y: 11.61, z: 13.95 },
      rotation: { x: 0.00, y: 0.00, z: 0.00 },
      startingTime: 6
    }
  };