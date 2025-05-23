export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type ActivitiesConnection = {
  __typename?: 'ActivitiesConnection';
  edges: Array<ActivityEdge>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type ActivityEdge = {
  __typename?: 'ActivityEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  /** The activity node */
  node: ActivityNode;
};

export type ActivityFileNode = {
  __typename?: 'ActivityFileNode';
  author?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  mime?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  size: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ActivityNode = {
  __typename?: 'ActivityNode';
  active: Scalars['Boolean']['output'];
  activityData: Scalars['String']['output'];
  activityId: Scalars['String']['output'];
  activityType: Scalars['String']['output'];
  assignee?: Maybe<UserNode>;
  author?: Maybe<UserNode>;
  body: Scalars['String']['output'];
  category?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creationOrder: Scalars['Int']['output'];
  entityId?: Maybe<Scalars['String']['output']>;
  entityName?: Maybe<Scalars['String']['output']>;
  entityPath?: Maybe<Scalars['String']['output']>;
  entityType: Scalars['String']['output'];
  files: Array<ActivityFileNode>;
  origin?: Maybe<ActivityOriginNode>;
  parents: Array<ActivityOriginNode>;
  projectName: Scalars['String']['output'];
  reactions: Array<ActivityReactionNode>;
  read: Scalars['Boolean']['output'];
  referenceData: Scalars['String']['output'];
  referenceId: Scalars['String']['output'];
  referenceType: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  version?: Maybe<VersionNode>;
};

export type ActivityOriginNode = {
  __typename?: 'ActivityOriginNode';
  id: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  name: Scalars['String']['output'];
  subtype?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type ActivityReactionNode = {
  __typename?: 'ActivityReactionNode';
  fullName?: Maybe<Scalars['String']['output']>;
  reaction: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  userName: Scalars['String']['output'];
};

export type AttributeFilterInput = {
  name: Scalars['String']['input'];
  values: Array<Scalars['String']['input']>;
};

export type BaseNode = {
  active: Scalars['Boolean']['output'];
  activities: ActivitiesConnection;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  links: LinksConnection;
  name: Scalars['String']['output'];
  projectName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type BaseNodeActivitiesArgs = {
  activityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  referenceTypes?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type BaseNodeLinksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  linkTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  nameEx?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  /** Event node */
  node: EventNode;
};

export type EventNode = {
  __typename?: 'EventNode';
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['String']['output']>;
  dependsOn?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  project?: Maybe<Scalars['String']['output']>;
  retries: Scalars['Int']['output'];
  sender?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  summary: Scalars['String']['output'];
  topic: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<Scalars['String']['output']>;
};

export type EventsConnection = {
  __typename?: 'EventsConnection';
  edges: Array<EventEdge>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type FileNode = {
  __typename?: 'FileNode';
  hash?: Maybe<Scalars['String']['output']>;
  hashType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  size: Scalars['String']['output'];
};

export type FolderAttribType = {
  __typename?: 'FolderAttribType';
  clipIn?: Maybe<Scalars['Int']['output']>;
  clipOut?: Maybe<Scalars['Int']['output']>;
  /** Textual description of the entity */
  description?: Maybe<Scalars['String']['output']>;
  distances?: Maybe<Array<Scalars['String']['output']>>;
  /** Deadline date and time */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** Frame rate */
  fps?: Maybe<Scalars['Float']['output']>;
  frameEnd?: Maybe<Scalars['Int']['output']>;
  frameStart?: Maybe<Scalars['Int']['output']>;
  ftrackId?: Maybe<Scalars['String']['output']>;
  ftrackPath?: Maybe<Scalars['String']['output']>;
  handleEnd?: Maybe<Scalars['Int']['output']>;
  handleStart?: Maybe<Scalars['Int']['output']>;
  /** Is this some really hard work? */
  hard?: Maybe<Scalars['Boolean']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  pixelAspect?: Maybe<Scalars['Float']['output']>;
  priority?: Maybe<Scalars['String']['output']>;
  /** Vertical resolution */
  resolutionHeight?: Maybe<Scalars['Int']['output']>;
  /** Horizontal resolution */
  resolutionWidth?: Maybe<Scalars['Int']['output']>;
  /** The Shotgrid ID of this entity. */
  shotgridId?: Maybe<Scalars['String']['output']>;
  /** The Shotgrid Type of this entity. */
  shotgridType?: Maybe<Scalars['String']['output']>;
  /** Date and time when the project or task or asset was started */
  startDate?: Maybe<Scalars['DateTime']['output']>;
  tools?: Maybe<Array<Scalars['String']['output']>>;
};

export type FolderEdge = {
  __typename?: 'FolderEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  /** The folder node */
  node: FolderNode;
};

export type FolderNode = BaseNode & {
  __typename?: 'FolderNode';
  active: Scalars['Boolean']['output'];
  activities: ActivitiesConnection;
  allAttrib: Scalars['String']['output'];
  attrib: FolderAttribType;
  childCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['String']['output']>;
  folderType: Scalars['String']['output'];
  hasChildren: Scalars['Boolean']['output'];
  hasProducts: Scalars['Boolean']['output'];
  hasReviewables: Scalars['Boolean']['output'];
  hasTasks: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  links: LinksConnection;
  name: Scalars['String']['output'];
  ownAttrib: Array<Scalars['String']['output']>;
  parent?: Maybe<FolderNode>;
  parentId?: Maybe<Scalars['String']['output']>;
  parents: Array<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  productCount: Scalars['Int']['output'];
  /** Return a list of products. */
  products: ProductsConnection;
  projectName: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  taskCount: Scalars['Int']['output'];
  /** Return a list of tasks. */
  tasks: TasksConnection;
  thumbnail?: Maybe<ThumbnailInfo>;
  thumbnailId?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type FolderNodeActivitiesArgs = {
  activityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  referenceTypes?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type FolderNodeLinksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  linkTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  nameEx?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type FolderNodeProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  folderIds?: InputMaybe<Array<Scalars['String']['input']>>;
  hasLinks?: InputMaybe<HasLinksFilter>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  nameEx?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
  namesCi?: InputMaybe<Array<Scalars['String']['input']>>;
  pathEx?: InputMaybe<Scalars['String']['input']>;
  productTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type FolderNodeTasksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  assignees?: InputMaybe<Array<Scalars['String']['input']>>;
  assigneesAny?: InputMaybe<Array<Scalars['String']['input']>>;
  attributes?: InputMaybe<Array<AttributeFilterInput>>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  folderIds?: InputMaybe<Array<Scalars['String']['input']>>;
  hasLinks?: InputMaybe<HasLinksFilter>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  includeFolderChildren?: Scalars['Boolean']['input'];
  last?: InputMaybe<Scalars['Int']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  tagsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  taskTypes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type FolderType = {
  __typename?: 'FolderType';
  icon: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type FoldersConnection = {
  __typename?: 'FoldersConnection';
  edges: Array<FolderEdge>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export enum HasLinksFilter {
  Any = 'ANY',
  Both = 'BOTH',
  In = 'IN',
  None = 'NONE',
  Out = 'OUT'
}

export type InboxConnection = {
  __typename?: 'InboxConnection';
  edges: Array<InboxEdge>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type InboxEdge = {
  __typename?: 'InboxEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  /** The inbox node */
  node: ActivityNode;
};

export type KanbanConnection = {
  __typename?: 'KanbanConnection';
  edges: Array<KanbanEdge>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type KanbanEdge = {
  __typename?: 'KanbanEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  /** The kanban node */
  node: KanbanNode;
};

export type KanbanNode = {
  __typename?: 'KanbanNode';
  assignees: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  folderId: Scalars['String']['output'];
  folderLabel?: Maybe<Scalars['String']['output']>;
  folderName: Scalars['String']['output'];
  folderPath: Scalars['String']['output'];
  hasReviewables: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  lastVersionWithReviewableProductId?: Maybe<Scalars['String']['output']>;
  lastVersionWithReviewableVersionId?: Maybe<Scalars['String']['output']>;
  lastVersionWithThumbnailId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  priority?: Maybe<Scalars['String']['output']>;
  projectCode: Scalars['String']['output'];
  projectName: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  taskType: Scalars['String']['output'];
  thumbnail?: Maybe<ThumbnailInfo>;
  thumbnailId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type LinkEdge = {
  __typename?: 'LinkEdge';
  author?: Maybe<Scalars['String']['output']>;
  cursor?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  direction: Scalars['String']['output'];
  entityId: Scalars['String']['output'];
  entityType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  linkType: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** Linked node */
  node: BaseNode;
  projectName: Scalars['String']['output'];
};

export type LinksConnection = {
  __typename?: 'LinksConnection';
  edges: Array<LinkEdge>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type ProductAttribType = {
  __typename?: 'ProductAttribType';
  /** Textual description of the entity */
  description?: Maybe<Scalars['String']['output']>;
  productGroup?: Maybe<Scalars['String']['output']>;
};

export type ProductEdge = {
  __typename?: 'ProductEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  /** Product node */
  node: ProductNode;
};

export type ProductNode = BaseNode & {
  __typename?: 'ProductNode';
  Folder?: Maybe<FolderNode>;
  active: Scalars['Boolean']['output'];
  activities: ActivitiesConnection;
  allAttrib: Scalars['String']['output'];
  attrib: ProductAttribType;
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['String']['output']>;
  /** Parent folder of the product */
  folder: FolderNode;
  folderId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  /** Last version of the product */
  latestVersion?: Maybe<VersionNode>;
  links: LinksConnection;
  name: Scalars['String']['output'];
  productType: Scalars['String']['output'];
  projectName: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  /** Simple (id /version) list of versions in the product */
  versionList: Array<VersionListItem>;
  /** Return a list of versions. */
  versions: VersionsConnection;
};


export type ProductNodeActivitiesArgs = {
  activityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  referenceTypes?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type ProductNodeLinksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  linkTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  nameEx?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type ProductNodeVersionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  authors?: InputMaybe<Array<Scalars['String']['input']>>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hasLinks?: InputMaybe<HasLinksFilter>;
  heroOnly?: Scalars['Boolean']['input'];
  heroOrLatestOnly?: Scalars['Boolean']['input'];
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  latestOnly?: Scalars['Boolean']['input'];
  productIds?: InputMaybe<Array<Scalars['String']['input']>>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  taskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  version?: InputMaybe<Scalars['Int']['input']>;
  versions?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ProductType = {
  __typename?: 'ProductType';
  color?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type ProductsConnection = {
  __typename?: 'ProductsConnection';
  edges: Array<ProductEdge>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type ProjectAttribType = {
  __typename?: 'ProjectAttribType';
  applications?: Maybe<Array<Scalars['String']['output']>>;
  clipIn?: Maybe<Scalars['Int']['output']>;
  clipOut?: Maybe<Scalars['Int']['output']>;
  /** Textual description of the entity */
  description?: Maybe<Scalars['String']['output']>;
  /** Deadline date and time */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** Frame rate */
  fps?: Maybe<Scalars['Float']['output']>;
  frameEnd?: Maybe<Scalars['Int']['output']>;
  frameStart?: Maybe<Scalars['Int']['output']>;
  ftrackId?: Maybe<Scalars['String']['output']>;
  ftrackPath?: Maybe<Scalars['String']['output']>;
  handleEnd?: Maybe<Scalars['Int']['output']>;
  handleStart?: Maybe<Scalars['Int']['output']>;
  pixelAspect?: Maybe<Scalars['Float']['output']>;
  priority?: Maybe<Scalars['String']['output']>;
  /** Vertical resolution */
  resolutionHeight?: Maybe<Scalars['Int']['output']>;
  /** Horizontal resolution */
  resolutionWidth?: Maybe<Scalars['Int']['output']>;
  /** The Shotgrid ID of this entity. */
  shotgridId?: Maybe<Scalars['String']['output']>;
  /** Push changes done to this project to ShotGrid. Requires the transmitter service. */
  shotgridPush?: Maybe<Scalars['Boolean']['output']>;
  /** The Shotgrid Type of this entity. */
  shotgridType?: Maybe<Scalars['String']['output']>;
  /** Date and time when the project or task or asset was started */
  startDate?: Maybe<Scalars['DateTime']['output']>;
  tools?: Maybe<Array<Scalars['String']['output']>>;
};

export type ProjectBundleType = {
  __typename?: 'ProjectBundleType';
  production?: Maybe<Scalars['String']['output']>;
  staging?: Maybe<Scalars['String']['output']>;
};

export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  /** The project node */
  node: ProjectNode;
};

export type ProjectNode = {
  __typename?: 'ProjectNode';
  active: Scalars['Boolean']['output'];
  activities: ActivitiesConnection;
  allAttrib: Scalars['String']['output'];
  attrib: ProjectAttribType;
  bundle: ProjectBundleType;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['String']['output']>;
  /** Return a folder node based on its ID */
  folder?: Maybe<FolderNode>;
  /** List of project's folder types */
  folderTypes: Array<FolderType>;
  /** Return a list of folders. */
  folders: FoldersConnection;
  library: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  /** Return a representation node based on its ID */
  product?: Maybe<ProductNode>;
  /** List of project's product types */
  productTypes: Array<ProductType>;
  /** Return a list of products. */
  products: ProductsConnection;
  projectName: Scalars['String']['output'];
  /** Return a representation node based on its ID */
  representation?: Maybe<RepresentationNode>;
  /** Return a list of representations. */
  representations: RepresentationsConnection;
  /** Return a task node based on its ID */
  task?: Maybe<TaskNode>;
  /** List of project's task types */
  taskTypes: Array<TaskType>;
  /** Return a list of tasks. */
  tasks: TasksConnection;
  thumbnail?: Maybe<ThumbnailInfo>;
  updatedAt: Scalars['DateTime']['output'];
  /** List of tags used in the project */
  usedTags: Array<Scalars['String']['output']>;
  /** Return a task node based on its ID */
  version?: Maybe<VersionNode>;
  /** Return a list of versions. */
  versions: VersionsConnection;
  /** Return a task node based on its ID */
  workfile?: Maybe<WorkfileNode>;
  /** Return a list of workfiles. */
  workfiles: WorkfilesConnection;
};


export type ProjectNodeActivitiesArgs = {
  activityIds?: InputMaybe<Array<Scalars['String']['input']>>;
  activityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  changedAfter?: InputMaybe<Scalars['String']['input']>;
  changedBefore?: InputMaybe<Scalars['String']['input']>;
  entityIds?: InputMaybe<Array<Scalars['String']['input']>>;
  entityNames?: InputMaybe<Array<Scalars['String']['input']>>;
  entityType?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  referenceTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type ProjectNodeFolderArgs = {
  id: Scalars['String']['input'];
};


export type ProjectNodeFolderTypesArgs = {
  activeOnly?: Scalars['Boolean']['input'];
};


export type ProjectNodeFoldersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  assignees?: InputMaybe<Array<Scalars['String']['input']>>;
  attributes?: InputMaybe<Array<AttributeFilterInput>>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  folderTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  hasChildren?: InputMaybe<Scalars['Boolean']['input']>;
  hasLinks?: InputMaybe<HasLinksFilter>;
  hasProducts?: InputMaybe<Scalars['Boolean']['input']>;
  hasTasks?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  parentIds?: InputMaybe<Array<Scalars['String']['input']>>;
  pathEx?: InputMaybe<Scalars['String']['input']>;
  paths?: InputMaybe<Array<Scalars['String']['input']>>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type ProjectNodeProductArgs = {
  id: Scalars['String']['input'];
};


export type ProjectNodeProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  folderIds?: InputMaybe<Array<Scalars['String']['input']>>;
  hasLinks?: InputMaybe<HasLinksFilter>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  nameEx?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
  namesCi?: InputMaybe<Array<Scalars['String']['input']>>;
  pathEx?: InputMaybe<Scalars['String']['input']>;
  productTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type ProjectNodeRepresentationArgs = {
  id: Scalars['String']['input'];
};


export type ProjectNodeRepresentationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hasLinks?: InputMaybe<HasLinksFilter>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  versionIds?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type ProjectNodeTaskArgs = {
  id: Scalars['String']['input'];
};


export type ProjectNodeTaskTypesArgs = {
  activeOnly?: Scalars['Boolean']['input'];
};


export type ProjectNodeTasksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  assignees?: InputMaybe<Array<Scalars['String']['input']>>;
  assigneesAny?: InputMaybe<Array<Scalars['String']['input']>>;
  attributes?: InputMaybe<Array<AttributeFilterInput>>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  folderIds?: InputMaybe<Array<Scalars['String']['input']>>;
  hasLinks?: InputMaybe<HasLinksFilter>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  includeFolderChildren?: Scalars['Boolean']['input'];
  last?: InputMaybe<Scalars['Int']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  tagsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  taskTypes?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type ProjectNodeVersionArgs = {
  id: Scalars['String']['input'];
};


export type ProjectNodeVersionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  authors?: InputMaybe<Array<Scalars['String']['input']>>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hasLinks?: InputMaybe<HasLinksFilter>;
  heroOnly?: Scalars['Boolean']['input'];
  heroOrLatestOnly?: Scalars['Boolean']['input'];
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  latestOnly?: Scalars['Boolean']['input'];
  productIds?: InputMaybe<Array<Scalars['String']['input']>>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  taskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  version?: InputMaybe<Scalars['Int']['input']>;
  versions?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type ProjectNodeWorkfileArgs = {
  id: Scalars['String']['input'];
};


export type ProjectNodeWorkfilesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hasLinks?: InputMaybe<HasLinksFilter>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  pathEx?: InputMaybe<Scalars['String']['input']>;
  paths?: InputMaybe<Array<Scalars['String']['input']>>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  taskIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ProjectsConnection = {
  __typename?: 'ProjectsConnection';
  edges: Array<ProjectEdge>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type Query = {
  __typename?: 'Query';
  /** Get a list of recorded events */
  events: EventsConnection;
  /** Get user inbox */
  inbox: InboxConnection;
  /** Get kanban board */
  kanban: KanbanConnection;
  /** Current user */
  me: UserNode;
  /** Studio-wide product type configuration */
  productTypes: Array<ProductType>;
  /** Get a project by name */
  project: ProjectNode;
  /** Get a list of projects */
  projects: ProjectsConnection;
  /** Get a user by name */
  user: UserNode;
  /** Get a list of users */
  users: UsersConnection;
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hasChildren?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  includeLogs?: Scalars['Boolean']['input'];
  last?: InputMaybe<Scalars['Int']['input']>;
  newerThan?: InputMaybe<Scalars['String']['input']>;
  olderThan?: InputMaybe<Scalars['String']['input']>;
  projects?: InputMaybe<Array<Scalars['String']['input']>>;
  states?: InputMaybe<Array<Scalars['String']['input']>>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
  users?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryInboxArgs = {
  before?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  showActiveMessages?: InputMaybe<Scalars['Boolean']['input']>;
  showActiveProjects?: InputMaybe<Scalars['Boolean']['input']>;
  showImportantMessages?: InputMaybe<Scalars['Boolean']['input']>;
  showUnreadMessages?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryKanbanArgs = {
  assigneesAny?: InputMaybe<Array<Scalars['String']['input']>>;
  before?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  projects?: InputMaybe<Array<Scalars['String']['input']>>;
  taskIds?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryProjectArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProjectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  name: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  emails?: InputMaybe<Array<Scalars['String']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
  projectName?: InputMaybe<Scalars['String']['input']>;
  projects?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type RepresentationAttribType = {
  __typename?: 'RepresentationAttribType';
  clipIn?: Maybe<Scalars['Int']['output']>;
  clipOut?: Maybe<Scalars['Int']['output']>;
  /** Textual description of the entity */
  description?: Maybe<Scalars['String']['output']>;
  extension?: Maybe<Scalars['String']['output']>;
  /** Frame rate */
  fps?: Maybe<Scalars['Float']['output']>;
  frameEnd?: Maybe<Scalars['Int']['output']>;
  frameStart?: Maybe<Scalars['Int']['output']>;
  handleEnd?: Maybe<Scalars['Int']['output']>;
  handleStart?: Maybe<Scalars['Int']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  pixelAspect?: Maybe<Scalars['Float']['output']>;
  /** Vertical resolution */
  resolutionHeight?: Maybe<Scalars['Int']['output']>;
  /** Horizontal resolution */
  resolutionWidth?: Maybe<Scalars['Int']['output']>;
  template?: Maybe<Scalars['String']['output']>;
};

export type RepresentationEdge = {
  __typename?: 'RepresentationEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  /** Representation node */
  node: RepresentationNode;
};

export type RepresentationNode = BaseNode & {
  __typename?: 'RepresentationNode';
  active: Scalars['Boolean']['output'];
  activities: ActivitiesConnection;
  allAttrib: Scalars['String']['output'];
  attrib: RepresentationAttribType;
  /** JSON serialized context data */
  context?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['String']['output']>;
  /** Number of files of the representation */
  fileCount: Scalars['Int']['output'];
  /** Files in the representation */
  files: Array<FileNode>;
  id: Scalars['String']['output'];
  links: LinksConnection;
  name: Scalars['String']['output'];
  projectName: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  traits?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  /** Parent version of the representation */
  version: VersionNode;
  versionId: Scalars['String']['output'];
};


export type RepresentationNodeActivitiesArgs = {
  activityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  referenceTypes?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type RepresentationNodeLinksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  linkTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  nameEx?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type RepresentationsConnection = {
  __typename?: 'RepresentationsConnection';
  edges: Array<RepresentationEdge>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type TaskAttribType = {
  __typename?: 'TaskAttribType';
  clipIn?: Maybe<Scalars['Int']['output']>;
  clipOut?: Maybe<Scalars['Int']['output']>;
  /** Textual description of the entity */
  description?: Maybe<Scalars['String']['output']>;
  distances?: Maybe<Array<Scalars['String']['output']>>;
  /** Deadline date and time */
  endDate?: Maybe<Scalars['DateTime']['output']>;
  /** Frame rate */
  fps?: Maybe<Scalars['Float']['output']>;
  frameEnd?: Maybe<Scalars['Int']['output']>;
  frameStart?: Maybe<Scalars['Int']['output']>;
  ftrackId?: Maybe<Scalars['String']['output']>;
  ftrackPath?: Maybe<Scalars['String']['output']>;
  handleEnd?: Maybe<Scalars['Int']['output']>;
  handleStart?: Maybe<Scalars['Int']['output']>;
  /** Is this some really hard work? */
  hard?: Maybe<Scalars['Boolean']['output']>;
  jiraCurrentPhase?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  pixelAspect?: Maybe<Scalars['Float']['output']>;
  priority?: Maybe<Scalars['String']['output']>;
  /** Vertical resolution */
  resolutionHeight?: Maybe<Scalars['Int']['output']>;
  /** Horizontal resolution */
  resolutionWidth?: Maybe<Scalars['Int']['output']>;
  /** The Shotgrid ID of this entity. */
  shotgridId?: Maybe<Scalars['String']['output']>;
  /** The Shotgrid Type of this entity. */
  shotgridType?: Maybe<Scalars['String']['output']>;
  /** Date and time when the project or task or asset was started */
  startDate?: Maybe<Scalars['DateTime']['output']>;
  tools?: Maybe<Array<Scalars['String']['output']>>;
};

export type TaskEdge = {
  __typename?: 'TaskEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  /** The task node */
  node: TaskNode;
};

export type TaskNode = BaseNode & {
  __typename?: 'TaskNode';
  Folder?: Maybe<FolderNode>;
  active: Scalars['Boolean']['output'];
  activities: ActivitiesConnection;
  allAttrib: Scalars['String']['output'];
  assignees: Array<Scalars['String']['output']>;
  attrib: TaskAttribType;
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['String']['output']>;
  /** Parent folder of the task */
  folder: FolderNode;
  folderId: Scalars['String']['output'];
  hasReviewables: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  links: LinksConnection;
  name: Scalars['String']['output'];
  ownAttrib: Array<Scalars['String']['output']>;
  projectName: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  taskType: Scalars['String']['output'];
  thumbnail?: Maybe<ThumbnailInfo>;
  thumbnailId?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  /** Return a list of versions. */
  versions: VersionsConnection;
  /** Return a list of workfiles. */
  workfiles: WorkfilesConnection;
};


export type TaskNodeActivitiesArgs = {
  activityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  referenceTypes?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type TaskNodeLinksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  linkTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  nameEx?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type TaskNodeVersionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  authors?: InputMaybe<Array<Scalars['String']['input']>>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hasLinks?: InputMaybe<HasLinksFilter>;
  heroOnly?: Scalars['Boolean']['input'];
  heroOrLatestOnly?: Scalars['Boolean']['input'];
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  latestOnly?: Scalars['Boolean']['input'];
  productIds?: InputMaybe<Array<Scalars['String']['input']>>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  taskIds?: InputMaybe<Array<Scalars['String']['input']>>;
  version?: InputMaybe<Scalars['Int']['input']>;
  versions?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type TaskNodeWorkfilesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hasLinks?: InputMaybe<HasLinksFilter>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  pathEx?: InputMaybe<Scalars['String']['input']>;
  paths?: InputMaybe<Array<Scalars['String']['input']>>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  taskIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type TaskType = {
  __typename?: 'TaskType';
  name: Scalars['String']['output'];
};

export type TasksConnection = {
  __typename?: 'TasksConnection';
  edges: Array<TaskEdge>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type ThumbnailInfo = {
  __typename?: 'ThumbnailInfo';
  id: Scalars['String']['output'];
  relation?: Maybe<Scalars['String']['output']>;
  sourceEntityId?: Maybe<Scalars['String']['output']>;
  sourceEntityType?: Maybe<Scalars['String']['output']>;
};

export type UserAttribType = {
  __typename?: 'UserAttribType';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  developerMode?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  /** The user node */
  node: UserNode;
};

export type UserNode = {
  __typename?: 'UserNode';
  accessGroups: Scalars['String']['output'];
  active: Scalars['Boolean']['output'];
  allAttrib: Scalars['String']['output'];
  apiKeyPreview?: Maybe<Scalars['String']['output']>;
  attrib: UserAttribType;
  createdAt: Scalars['DateTime']['output'];
  defaultAccessGroups: Array<Scalars['String']['output']>;
  deleted: Scalars['Boolean']['output'];
  hasPassword: Scalars['Boolean']['output'];
  isAdmin: Scalars['Boolean']['output'];
  isDeveloper: Scalars['Boolean']['output'];
  isGuest: Scalars['Boolean']['output'];
  isManager: Scalars['Boolean']['output'];
  isService: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  tasks: TasksConnection;
  updatedAt: Scalars['DateTime']['output'];
  userPool?: Maybe<Scalars['String']['output']>;
};


export type UserNodeTasksArgs = {
  projectName: Scalars['String']['input'];
};

export type UsersConnection = {
  __typename?: 'UsersConnection';
  edges: Array<UserEdge>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type VersionAttribType = {
  __typename?: 'VersionAttribType';
  clipIn?: Maybe<Scalars['Int']['output']>;
  clipOut?: Maybe<Scalars['Int']['output']>;
  colorSpace?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  /** Textual description of the entity */
  description?: Maybe<Scalars['String']['output']>;
  families?: Maybe<Array<Scalars['String']['output']>>;
  /** Frame rate */
  fps?: Maybe<Scalars['Float']['output']>;
  frameEnd?: Maybe<Scalars['Int']['output']>;
  frameStart?: Maybe<Scalars['Int']['output']>;
  ftrackId?: Maybe<Scalars['String']['output']>;
  handleEnd?: Maybe<Scalars['Int']['output']>;
  handleStart?: Maybe<Scalars['Int']['output']>;
  intent?: Maybe<Scalars['String']['output']>;
  machine?: Maybe<Scalars['String']['output']>;
  pixelAspect?: Maybe<Scalars['Float']['output']>;
  /** Vertical resolution */
  resolutionHeight?: Maybe<Scalars['Int']['output']>;
  /** Horizontal resolution */
  resolutionWidth?: Maybe<Scalars['Int']['output']>;
  site?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
};

export type VersionEdge = {
  __typename?: 'VersionEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  /** Version node */
  node: VersionNode;
};

export type VersionListItem = {
  __typename?: 'VersionListItem';
  id: Scalars['String']['output'];
  /** Version name */
  name: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type VersionNode = BaseNode & {
  __typename?: 'VersionNode';
  active: Scalars['Boolean']['output'];
  activities: ActivitiesConnection;
  allAttrib: Scalars['String']['output'];
  attrib: VersionAttribType;
  author?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['String']['output']>;
  hasReviewables: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  links: LinksConnection;
  name: Scalars['String']['output'];
  /** Parent product of the version */
  product: ProductNode;
  productId: Scalars['String']['output'];
  projectName: Scalars['String']['output'];
  /** Return a list of representations. */
  representations: RepresentationsConnection;
  status: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  /** Task */
  task?: Maybe<TaskNode>;
  taskId?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<ThumbnailInfo>;
  thumbnailId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  version: Scalars['Int']['output'];
};


export type VersionNodeActivitiesArgs = {
  activityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  referenceTypes?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type VersionNodeLinksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  linkTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  nameEx?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type VersionNodeRepresentationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hasLinks?: InputMaybe<HasLinksFilter>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  versionIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type VersionsConnection = {
  __typename?: 'VersionsConnection';
  edges: Array<VersionEdge>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type WorkfileAttribType = {
  __typename?: 'WorkfileAttribType';
  /** Textual description of the entity */
  description?: Maybe<Scalars['String']['output']>;
  extension?: Maybe<Scalars['String']['output']>;
};

export type WorkfileEdge = {
  __typename?: 'WorkfileEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  /** Workfile node */
  node: WorkfileNode;
};

export type WorkfileNode = BaseNode & {
  __typename?: 'WorkfileNode';
  active: Scalars['Boolean']['output'];
  activities: ActivitiesConnection;
  allAttrib: Scalars['String']['output'];
  attrib: WorkfileAttribType;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  links: LinksConnection;
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  projectName: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  /** Parent task of the workfile */
  task: TaskNode;
  taskId?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<ThumbnailInfo>;
  thumbnailId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy?: Maybe<Scalars['String']['output']>;
};


export type WorkfileNodeActivitiesArgs = {
  activityTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  referenceTypes?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type WorkfileNodeLinksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  linkTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  nameEx?: InputMaybe<Scalars['String']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type WorkfilesConnection = {
  __typename?: 'WorkfilesConnection';
  edges: Array<WorkfileEdge>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type ActivityFragmentFragment = { __typename?: 'ActivityNode', activityId: string, activityType: string, activityData: string, referenceType: string, referenceId: string, entityId?: string | null, body: string, createdAt: any, updatedAt: any, author?: { __typename?: 'UserNode', name: string, deleted: boolean, active: boolean, attrib: { __typename?: 'UserAttribType', fullName?: string | null } } | null, files: Array<{ __typename?: 'ActivityFileNode', id: string, name?: string | null, size: string, mime?: string | null }>, origin?: { __typename?: 'ActivityOriginNode', id: string, name: string, label?: string | null, type: string } | null, reactions: Array<{ __typename?: 'ActivityReactionNode', fullName?: string | null, userName: string, reaction: string, timestamp: any }>, version?: { __typename?: 'VersionNode', attrib: { __typename?: 'VersionAttribType', comment?: string | null } } | null };

export type GetActivitiesByIdQueryVariables = Exact<{
  projectName: Scalars['String']['input'];
  entityIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  activityIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetActivitiesByIdQuery = { __typename?: 'Query', project: { __typename?: 'ProjectNode', name: string, activities: { __typename?: 'ActivitiesConnection', pageInfo: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ActivityEdge', cursor?: string | null, node: { __typename?: 'ActivityNode', activityId: string, activityType: string, activityData: string, referenceType: string, referenceId: string, entityId?: string | null, body: string, createdAt: any, updatedAt: any, author?: { __typename?: 'UserNode', name: string, deleted: boolean, active: boolean, attrib: { __typename?: 'UserAttribType', fullName?: string | null } } | null, files: Array<{ __typename?: 'ActivityFileNode', id: string, name?: string | null, size: string, mime?: string | null }>, origin?: { __typename?: 'ActivityOriginNode', id: string, name: string, label?: string | null, type: string } | null, reactions: Array<{ __typename?: 'ActivityReactionNode', fullName?: string | null, userName: string, reaction: string, timestamp: any }>, version?: { __typename?: 'VersionNode', attrib: { __typename?: 'VersionAttribType', comment?: string | null } } | null } }> } } };

export type GetActivitiesQueryVariables = Exact<{
  projectName: Scalars['String']['input'];
  entityIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  referenceTypes?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  activityTypes?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetActivitiesQuery = { __typename?: 'Query', project: { __typename?: 'ProjectNode', name: string, activities: { __typename?: 'ActivitiesConnection', pageInfo: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ActivityEdge', cursor?: string | null, node: { __typename?: 'ActivityNode', activityId: string, activityType: string, activityData: string, referenceType: string, referenceId: string, entityId?: string | null, body: string, createdAt: any, updatedAt: any, author?: { __typename?: 'UserNode', name: string, deleted: boolean, active: boolean, attrib: { __typename?: 'UserAttribType', fullName?: string | null } } | null, files: Array<{ __typename?: 'ActivityFileNode', id: string, name?: string | null, size: string, mime?: string | null }>, origin?: { __typename?: 'ActivityOriginNode', id: string, name: string, label?: string | null, type: string } | null, reactions: Array<{ __typename?: 'ActivityReactionNode', fullName?: string | null, userName: string, reaction: string, timestamp: any }>, version?: { __typename?: 'VersionNode', attrib: { __typename?: 'VersionAttribType', comment?: string | null } } | null } }> } } };

export type GetEntitiesChecklistsQueryVariables = Exact<{
  projectName: Scalars['String']['input'];
  entityIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type GetEntitiesChecklistsQuery = { __typename?: 'Query', project: { __typename?: 'ProjectNode', name: string, activities: { __typename?: 'ActivitiesConnection', edges: Array<{ __typename?: 'ActivityEdge', cursor?: string | null, node: { __typename?: 'ActivityNode', activityId: string, body: string } }> } } };

export type GetProductVersionsQueryVariables = Exact<{
  projectName: Scalars['String']['input'];
  productId: Scalars['String']['input'];
}>;


export type GetProductVersionsQuery = { __typename?: 'Query', project: { __typename?: 'ProjectNode', product?: { __typename?: 'ProductNode', versionList: Array<{ __typename?: 'VersionListItem', id: string, name: string, version: number }> } | null } };

export type GetInboxHasUnreadQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInboxHasUnreadQuery = { __typename?: 'Query', inbox: { __typename?: 'InboxConnection', edges: Array<{ __typename?: 'InboxEdge', node: { __typename?: 'ActivityNode', referenceId: string, read: boolean } }> } };

export type GetInboxMessagesQueryVariables = Exact<{
  last?: InputMaybe<Scalars['Int']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  important?: InputMaybe<Scalars['Boolean']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetInboxMessagesQuery = { __typename?: 'Query', inbox: { __typename?: 'InboxConnection', pageInfo: { __typename?: 'PageInfo', hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'InboxEdge', cursor?: string | null, node: { __typename?: 'ActivityNode', projectName: string, activityId: string, activityType: string, activityData: string, referenceType: string, referenceId: string, body: string, createdAt: any, updatedAt: any, active: boolean, read: boolean, author?: { __typename?: 'UserNode', name: string, attrib: { __typename?: 'UserAttribType', fullName?: string | null } } | null, origin?: { __typename?: 'ActivityOriginNode', id: string, name: string, label?: string | null, type: string, subtype?: string | null } | null, parents: Array<{ __typename?: 'ActivityOriginNode', type: string, name: string, label?: string | null }> } }> } };

export type MessageFragmentFragment = { __typename?: 'ActivityNode', projectName: string, activityId: string, activityType: string, activityData: string, referenceType: string, referenceId: string, body: string, createdAt: any, updatedAt: any, active: boolean, read: boolean, author?: { __typename?: 'UserNode', name: string, attrib: { __typename?: 'UserAttribType', fullName?: string | null } } | null, origin?: { __typename?: 'ActivityOriginNode', id: string, name: string, label?: string | null, type: string, subtype?: string | null } | null, parents: Array<{ __typename?: 'ActivityOriginNode', type: string, name: string, label?: string | null }> };

export type GetInboxUnreadCountQueryVariables = Exact<{
  important?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetInboxUnreadCountQuery = { __typename?: 'Query', inbox: { __typename?: 'InboxConnection', edges: Array<{ __typename?: 'InboxEdge', node: { __typename?: 'ActivityNode', referenceId: string, read: boolean } }> } };

export type GetMarketInstallEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMarketInstallEventsQuery = { __typename?: 'Query', events: { __typename?: 'EventsConnection', edges: Array<{ __typename?: 'EventEdge', node: { __typename?: 'EventNode', id: string, status: string, description: string, summary: string } }> } };

export type GetInstallEventsQueryVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type GetInstallEventsQuery = { __typename?: 'Query', events: { __typename?: 'EventsConnection', edges: Array<{ __typename?: 'EventEdge', node: { __typename?: 'EventNode', id: string, status: string, description: string } }> } };

export type GetTasksByParentQueryVariables = Exact<{
  projectName: Scalars['String']['input'];
  parentIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
  filter?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTasksByParentQuery = { __typename?: 'Query', project: { __typename?: 'ProjectNode', name: string, tasks: { __typename?: 'TasksConnection', edges: Array<{ __typename?: 'TaskEdge', node: { __typename?: 'TaskNode', id: string, folderId: string, label?: string | null, name: string, ownAttrib: Array<string>, status: string, tags: Array<string>, taskType: string, updatedAt: any, active: boolean, assignees: Array<string>, allAttrib: string, folder: { __typename?: 'FolderNode', path?: string | null } } }> } } };

export type GetTasksListQueryVariables = Exact<{
  projectName: Scalars['String']['input'];
  folderIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTasksListQuery = { __typename?: 'Query', project: { __typename?: 'ProjectNode', name: string, tasks: { __typename?: 'TasksConnection', pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean }, edges: Array<{ __typename?: 'TaskEdge', cursor?: string | null, node: { __typename?: 'TaskNode', id: string, folderId: string, label?: string | null, name: string, ownAttrib: Array<string>, status: string, tags: Array<string>, taskType: string, updatedAt: any, active: boolean, assignees: Array<string>, allAttrib: string, folder: { __typename?: 'FolderNode', path?: string | null } } }> } } };

export type TaskPropsFragmentFragment = { __typename?: 'TaskNode', id: string, folderId: string, label?: string | null, name: string, ownAttrib: Array<string>, status: string, tags: Array<string>, taskType: string, updatedAt: any, active: boolean, assignees: Array<string>, allAttrib: string, folder: { __typename?: 'FolderNode', path?: string | null } };

export type GetProjectLatestQueryVariables = Exact<{
  projectName: Scalars['String']['input'];
}>;


export type GetProjectLatestQuery = { __typename?: 'Query', project: { __typename?: 'ProjectNode', name: string } };

export type GetProgressTaskQueryVariables = Exact<{
  projectName: Scalars['String']['input'];
  taskId: Scalars['String']['input'];
}>;


export type GetProgressTaskQuery = { __typename?: 'Query', project: { __typename?: 'ProjectNode', name: string, task?: { __typename?: 'TaskNode', projectName: string, id: string, name: string, label?: string | null, taskType: string, status: string, assignees: Array<string>, updatedAt: any, active: boolean, hasReviewables: boolean, tags: Array<string>, attrib: { __typename?: 'TaskAttribType', priority?: string | null, endDate?: any | null, resolutionHeight?: number | null, resolutionWidth?: number | null, fps?: number | null }, folder: { __typename?: 'FolderNode', id: string, name: string, label?: string | null, folderType: string, parents: Array<string>, status: string, updatedAt: any, parent?: { __typename?: 'FolderNode', id: string, name: string, label?: string | null, parents: Array<string> } | null } } | null } };

export type GetTasksProgressQueryVariables = Exact<{
  projectName: Scalars['String']['input'];
  folderIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  assignees?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  assigneesAny?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  tagsAny?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  statuses?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  taskTypes?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  attributes?: InputMaybe<Array<AttributeFilterInput> | AttributeFilterInput>;
}>;


export type GetTasksProgressQuery = { __typename?: 'Query', project: { __typename?: 'ProjectNode', name: string, tasks: { __typename?: 'TasksConnection', edges: Array<{ __typename?: 'TaskEdge', node: { __typename?: 'TaskNode', projectName: string, id: string, name: string, label?: string | null, taskType: string, status: string, assignees: Array<string>, updatedAt: any, active: boolean, hasReviewables: boolean, tags: Array<string>, attrib: { __typename?: 'TaskAttribType', priority?: string | null, endDate?: any | null, resolutionHeight?: number | null, resolutionWidth?: number | null, fps?: number | null }, folder: { __typename?: 'FolderNode', id: string, name: string, label?: string | null, folderType: string, parents: Array<string>, status: string, updatedAt: any, parent?: { __typename?: 'FolderNode', id: string, name: string, label?: string | null, parents: Array<string> } | null } } }> } } };

export type ProgressTaskFragmentFragment = { __typename?: 'TaskNode', projectName: string, id: string, name: string, label?: string | null, taskType: string, status: string, assignees: Array<string>, updatedAt: any, active: boolean, hasReviewables: boolean, tags: Array<string>, attrib: { __typename?: 'TaskAttribType', priority?: string | null, endDate?: any | null, resolutionHeight?: number | null, resolutionWidth?: number | null, fps?: number | null }, folder: { __typename?: 'FolderNode', id: string, name: string, label?: string | null, folderType: string, parents: Array<string>, status: string, updatedAt: any, parent?: { __typename?: 'FolderNode', id: string, name: string, label?: string | null, parents: Array<string> } | null } };

export type GetActiveUsersCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveUsersCountQuery = { __typename?: 'Query', users: { __typename?: 'UsersConnection', edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'UserNode', active: boolean, isGuest: boolean } }> } };

export type GetAllAssigneesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAssigneesQuery = { __typename?: 'Query', users: { __typename?: 'UsersConnection', edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'UserNode', name: string, updatedAt: any, attrib: { __typename?: 'UserAttribType', fullName?: string | null } } }> } };

export type GetAllProjectUsersAsAssigneeQueryVariables = Exact<{
  projectName?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllProjectUsersAsAssigneeQuery = { __typename?: 'Query', users: { __typename?: 'UsersConnection', edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'UserNode', name: string, updatedAt: any, attrib: { __typename?: 'UserAttribType', fullName?: string | null } } }> } };

export type GetKanbanQueryVariables = Exact<{
  projects?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  assignees?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetKanbanQuery = { __typename?: 'Query', kanban: { __typename?: 'KanbanConnection', edges: Array<{ __typename?: 'KanbanEdge', node: { __typename?: 'KanbanNode', id: string, projectName: string, projectCode: string, name: string, label?: string | null, status: string, tags: Array<string>, taskType: string, assignees: Array<string>, updatedAt: any, createdAt: any, dueDate?: any | null, folderId: string, thumbnailId?: string | null, folderLabel?: string | null, folderName: string, folderPath: string, hasReviewables: boolean, priority?: string | null } }> } };

export type GetKanbanProjectUsersQueryVariables = Exact<{
  projects?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetKanbanProjectUsersQuery = { __typename?: 'Query', users: { __typename?: 'UsersConnection', edges: Array<{ __typename?: 'UserEdge', node: { __typename?: 'UserNode', name: string, accessGroups: string, isManager: boolean, isAdmin: boolean, attrib: { __typename?: 'UserAttribType', fullName?: string | null } } }> } };

export type GetKanbanTasksQueryVariables = Exact<{
  projects?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  taskIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetKanbanTasksQuery = { __typename?: 'Query', kanban: { __typename?: 'KanbanConnection', edges: Array<{ __typename?: 'KanbanEdge', node: { __typename?: 'KanbanNode', id: string, projectName: string, projectCode: string, name: string, label?: string | null, status: string, tags: Array<string>, taskType: string, assignees: Array<string>, updatedAt: any, createdAt: any, dueDate?: any | null, folderId: string, thumbnailId?: string | null, folderLabel?: string | null, folderName: string, folderPath: string, hasReviewables: boolean, priority?: string | null } }> } };

export type KanbanFragmentFragment = { __typename?: 'KanbanNode', id: string, projectName: string, projectCode: string, name: string, label?: string | null, status: string, tags: Array<string>, taskType: string, assignees: Array<string>, updatedAt: any, createdAt: any, dueDate?: any | null, folderId: string, thumbnailId?: string | null, folderLabel?: string | null, folderName: string, folderPath: string, hasReviewables: boolean, priority?: string | null };
