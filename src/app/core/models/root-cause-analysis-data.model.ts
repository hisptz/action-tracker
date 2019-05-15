export interface RootCauseAnalysisData {
  id: string;
  configurationId: string;
  dataValues: { [id: string]: string };
  showEditNotification?: boolean;
  createdAt?: string;
  updatedAt?: string;
  user?: string;
  isActive?: boolean;
  isNew?: boolean;
  savingColor?: string;
}
