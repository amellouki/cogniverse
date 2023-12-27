export const BOT_REPO = {
  ID: 1,
  CREATE: {
    name: 'TestBot1',
    description: 'test bot 1',
    type: 'AGENT',
    configuration: {},
    creator: {
      connect: {
        id: 'creator1',
      },
    },
  },
  GET: {
    id: 1,
    name: 'TestBot1',
    description: 'test bot 1',
    type: 'AGENT',
    configuration: {},
    configVersion: '0.0.1',
    creatorId: 'creator1',
    boundDocumentId: null,
    public: false,
  },
  GET_MANY: [
    {
      id: 1,
      name: 'TestBot1',
      description: 'test bot 1',
      type: 'AGENT',
      configuration: {},
      configVersion: '0.0.1',
      creatorId: 'creator1',
      boundDocumentId: null,
      public: false,
    },
    {
      id: 2,
      name: 'TestBot2',
      description: 'test bot 2',
      type: 'AGENT',
      configuration: {},
      configVersion: '0.0.1',
      creatorId: 'creator1',
      boundDocumentId: null,
      public: false,
    },
  ],
};
