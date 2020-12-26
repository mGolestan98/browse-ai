import RequestHandler from "./request";

type JobDataType = {
  statusCode: number;
  messageCode: "ok" | "bad_request";
  result?: {
    id: string;
    createdAt: number;
    startedAt: number;
    finishedAt: number;
    triedRecordingVideo: boolean;
    triggeredByAPI: boolean;
    userFriendlyError?: string;
    videoRemovedAt?: number;
    videoUrl?: number;
    variables: Array<{
      name: string;
      label: string;
      value: string;
      defaultValue: string;
      type: string;
      encrypted: boolean;
    }>;
    capturedTexts: Array<{
      id: string;
      createdAt: number;
      name: string;
      text: string;
      type: string;
      targetNotFound: boolean;
    }>;
  };
};

type TriggerTaskArgsType = {
  taskId: string;
  variables?: { [key: string]: string };
  waitForJob?: boolean;
};

class BrowseAi {
  private RequestHandler: RequestHandler;
  constructor(apiKey: string) {
    this.RequestHandler = new RequestHandler(apiKey);
  }

  getJobData(taskId: string, jobId: string): Promise<JobDataType> {
    return this.RequestHandler.get(`/tasks/${taskId}/jobs/${jobId}`);
  }

  triggerTask(args: TriggerTaskArgsType): Promise<JobDataType> {
    if (!args.taskId) return Promise.reject("taskId is required.");

    return this.RequestHandler.post(
      `/tasks/${args.taskId}/jobs${args.waitForJob ? "?waitForJob=true" : ""}`,
      { variables: args.variables }
    );
  }
}

export default BrowseAi;
