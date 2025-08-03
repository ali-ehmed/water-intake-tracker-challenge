export interface WaterLogInterface {
  userId: string;
  date: string;
  intakeMl: number;
}

export interface WaterLogReturnInterface {
  date: Date;
  totalIntake: number;
  percentageOfGoal: number;
}

export interface WaterLogsInterface {
  date: Date;
  intakeMl: number;
  userId: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
