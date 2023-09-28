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
  ObjID: { input: any; output: any; }
};

export type Artist = Term & {
  __typename?: 'Artist';
  description?: Maybe<Scalars['String']['output']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  taxonomy: Taxonomy;
};

export type AudioUpload = MediaUpload & {
  __typename?: 'AudioUpload';
  album?: Maybe<Scalars['String']['output']>;
  albumArtist?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  artist?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  description?: Maybe<Scalars['String']['output']>;
  destination: Scalars['String']['output'];
  duration?: Maybe<Scalars['Float']['output']>;
  fileName: Scalars['String']['output'];
  fileSize: Scalars['Int']['output'];
  genre?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['ObjID']['output'];
  images?: Maybe<Array<Maybe<ImageUploadCrop>>>;
  mimeType: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type Block = {
  __typename?: 'Block';
  data?: Maybe<Data>;
  depth?: Maybe<Scalars['Int']['output']>;
  entityRanges?: Maybe<Array<Maybe<EntityRange>>>;
  inlineStyleRanges?: Maybe<Array<Maybe<InlineStyleRange>>>;
  key?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type BlockInput = {
  data?: InputMaybe<DataInput>;
  depth?: InputMaybe<Scalars['Int']['input']>;
  entityRanges?: InputMaybe<Array<InputMaybe<EntityRangeInput>>>;
  inlineStyleRanges?: InputMaybe<Array<InputMaybe<InlineStyleRangeInput>>>;
  key?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Category = Term & {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']['output']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  taxonomy: Taxonomy;
};

export type ContentState = {
  __typename?: 'ContentState';
  blocks?: Maybe<Array<Maybe<Block>>>;
  entityMap?: Maybe<Array<Maybe<Entity>>>;
};

export type ContentStateInput = {
  blocks?: InputMaybe<Array<InputMaybe<BlockInput>>>;
  entityMap?: InputMaybe<Array<InputMaybe<EntityInput>>>;
};

export type CreatePodcastInput = {
  audio?: InputMaybe<Scalars['ObjID']['input']>;
  date?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['ObjID']['input']>;
  title: Scalars['String']['input'];
};

export type CreatePostInput = {
  artists?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentState?: InputMaybe<ContentStateInput>;
  date?: InputMaybe<Scalars['Float']['input']>;
  featuredMedia?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PostStatus>;
  summary?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateShowInput = {
  artist: Scalars['ObjID']['input'];
  date: Scalars['Float']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  venue: Scalars['ObjID']['input'];
};

export type CreateTaxonomyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  plural?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTermInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  capacity?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  crossStreets?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  featuredMedia?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name: Scalars['String']['input'];
  neighborhood?: InputMaybe<Scalars['ObjID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  taxonomy: Scalars['ObjID']['input'];
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CreateVideoInput = {
  dataId?: InputMaybe<Scalars['String']['input']>;
  dataPlaylistIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  dataType?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  publishedAt: Scalars['Float']['input'];
  publishedISO?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};

export type CrossStreet = Term & {
  __typename?: 'CrossStreet';
  description?: Maybe<Scalars['String']['output']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  taxonomy: Taxonomy;
};

export type DashboardSettings = {
  __typename?: 'DashboardSettings';
  googleClientId?: Maybe<Scalars['String']['output']>;
  googleTrackingId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
};

export type DashboardSettingsInput = {
  googleClientId?: InputMaybe<Scalars['String']['input']>;
  googleTrackingId?: InputMaybe<Scalars['String']['input']>;
};

export type Data = {
  __typename?: 'Data';
  id?: Maybe<Scalars['String']['output']>;
};

export type DataInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type EmbedData = {
  __typename?: 'EmbedData';
  html?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type Entity = {
  __typename?: 'Entity';
  data?: Maybe<EntityData>;
  mutability?: Maybe<EntityMutability>;
  type?: Maybe<EntityType>;
};

export type EntityData = EmbedData | ImageData | LinkData | VideoData;

export type EntityDataInput = {
  href?: InputMaybe<Scalars['String']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  imageId?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
  target?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
  videoId?: InputMaybe<Scalars['String']['input']>;
};

export type EntityInput = {
  data?: InputMaybe<EntityDataInput>;
  mutability?: InputMaybe<EntityMutability>;
  type?: InputMaybe<EntityType>;
};

export enum EntityMutability {
  Immutable = 'IMMUTABLE',
  Mutable = 'MUTABLE',
  Segmented = 'SEGMENTED'
}

export type EntityRange = {
  __typename?: 'EntityRange';
  key?: Maybe<Scalars['Int']['output']>;
  length?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
};

export type EntityRangeInput = {
  key?: InputMaybe<Scalars['Int']['input']>;
  length?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export enum EntityType {
  Embed = 'EMBED',
  Image = 'IMAGE',
  Link = 'LINK',
  Photo = 'PHOTO',
  Token = 'TOKEN',
  Video = 'VIDEO'
}

export type FileUpload = MediaUpload & {
  __typename?: 'FileUpload';
  description?: Maybe<Scalars['String']['output']>;
  destination: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  fileSize: Scalars['Int']['output'];
  id: Scalars['ObjID']['output'];
  mimeType: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type ImageData = {
  __typename?: 'ImageData';
  image?: Maybe<ImageUpload>;
  imageId?: Maybe<Scalars['ObjID']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ImageUpload = MediaUpload & {
  __typename?: 'ImageUpload';
  altText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  crops: Array<ImageUploadCrop>;
  destination: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  fileSize: Scalars['Int']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ObjID']['output'];
  mimeType: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type ImageUploadCrop = {
  __typename?: 'ImageUploadCrop';
  fileName: Scalars['String']['output'];
  fileSize: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  width: Scalars['Int']['output'];
};

export type ImageUploadCropInput = {
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type InlineStyleRange = {
  __typename?: 'InlineStyleRange';
  length?: Maybe<Scalars['Int']['output']>;
  offset?: Maybe<Scalars['Int']['output']>;
  style?: Maybe<Scalars['String']['output']>;
};

export type InlineStyleRangeInput = {
  length?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  style?: InputMaybe<Scalars['String']['input']>;
};

export type LinkData = {
  __typename?: 'LinkData';
  href?: Maybe<Scalars['String']['output']>;
  target?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type MediaCropSetting = {
  __typename?: 'MediaCropSetting';
  height?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type MediaCropSettingInput = {
  height?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type MediaSettings = {
  __typename?: 'MediaSettings';
  crops: Array<MediaCropSetting>;
  id: Scalars['String']['output'];
};

export type MediaSettingsInput = {
  crops?: InputMaybe<Array<InputMaybe<MediaCropSettingInput>>>;
};

export type MediaUpload = {
  destination: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  fileSize: Scalars['Int']['output'];
  id: Scalars['ObjID']['output'];
  mimeType: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type MediaUploadConnection = {
  __typename?: 'MediaUploadConnection';
  count: Scalars['Int']['output'];
  edges: Array<MediaUploadEdge>;
  mimeTypes?: Maybe<Array<Scalars['String']['output']>>;
  pageInfo: PageInfo;
  types?: Maybe<Array<Scalars['String']['output']>>;
};

export type MediaUploadEdge = {
  __typename?: 'MediaUploadEdge';
  cursor: Scalars['String']['output'];
  node: MediaUpload;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPodcast?: Maybe<Podcast>;
  createPost?: Maybe<Post>;
  createShow?: Maybe<Show>;
  createTaxonomy?: Maybe<Taxonomy>;
  createTerm?: Maybe<Term>;
  createUser?: Maybe<User>;
  createVideo?: Maybe<Video>;
  removeMediaUpload?: Maybe<Scalars['Boolean']['output']>;
  removePodcast?: Maybe<Scalars['Boolean']['output']>;
  removePost?: Maybe<Scalars['Boolean']['output']>;
  removeShow?: Maybe<Scalars['Boolean']['output']>;
  removeTaxonomy?: Maybe<Scalars['Boolean']['output']>;
  removeTerm?: Maybe<Scalars['Boolean']['output']>;
  removeUser?: Maybe<Scalars['Boolean']['output']>;
  removeVideo?: Maybe<Scalars['Boolean']['output']>;
  updateDashboardSettings?: Maybe<DashboardSettings>;
  updateMediaSettings?: Maybe<MediaSettings>;
  updateMediaUpload?: Maybe<MediaUpload>;
  updatePodcast?: Maybe<Podcast>;
  updatePodcastSettings?: Maybe<PodcastSettings>;
  updatePost?: Maybe<Post>;
  updateShow?: Maybe<Show>;
  updateSiteSettings?: Maybe<SiteSettings>;
  updateSocialSettings?: Maybe<SocialSettings>;
  updateTaxonomy?: Maybe<Taxonomy>;
  updateTerm?: Maybe<Term>;
  updateUser?: Maybe<User>;
  updateVideo?: Maybe<Video>;
};


export type MutationCreatePodcastArgs = {
  input: CreatePodcastInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateShowArgs = {
  input: CreateShowInput;
};


export type MutationCreateTaxonomyArgs = {
  input: CreateTaxonomyInput;
};


export type MutationCreateTermArgs = {
  input: CreateTermInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateVideoArgs = {
  input: CreateVideoInput;
};


export type MutationRemoveMediaUploadArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']['input']>>;
};


export type MutationRemovePodcastArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']['input']>>;
};


export type MutationRemovePostArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']['input']>>;
};


export type MutationRemoveShowArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']['input']>>;
};


export type MutationRemoveTaxonomyArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']['input']>>;
};


export type MutationRemoveTermArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']['input']>>;
};


export type MutationRemoveUserArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']['input']>>;
};


export type MutationRemoveVideoArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']['input']>>;
};


export type MutationUpdateDashboardSettingsArgs = {
  id: Scalars['String']['input'];
  input: DashboardSettingsInput;
};


export type MutationUpdateMediaSettingsArgs = {
  id: Scalars['String']['input'];
  input: MediaSettingsInput;
};


export type MutationUpdateMediaUploadArgs = {
  id: Scalars['ObjID']['input'];
  input: UpdateMediaUploadInput;
};


export type MutationUpdatePodcastArgs = {
  id: Scalars['ObjID']['input'];
  input: UpdatePodcastInput;
};


export type MutationUpdatePodcastSettingsArgs = {
  id: Scalars['String']['input'];
  input: PodcastSettingsInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['ObjID']['input'];
  input: UpdatePostInput;
};


export type MutationUpdateShowArgs = {
  id: Scalars['ObjID']['input'];
  input: UpdateShowInput;
};


export type MutationUpdateSiteSettingsArgs = {
  id: Scalars['String']['input'];
  input: SiteSettingsInput;
};


export type MutationUpdateSocialSettingsArgs = {
  id: Scalars['String']['input'];
  input: SocialSettingsInput;
};


export type MutationUpdateTaxonomyArgs = {
  id: Scalars['ObjID']['input'];
  input: UpdateTaxonomyInput;
};


export type MutationUpdateTermArgs = {
  id: Scalars['ObjID']['input'];
  input: UpdateTermInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ObjID']['input'];
  input: UpdateUserInput;
};


export type MutationUpdateVideoArgs = {
  id: Scalars['ObjID']['input'];
  input: UpdateVideoInput;
};

export type Neighborhood = Term & {
  __typename?: 'Neighborhood';
  description?: Maybe<Scalars['String']['output']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  taxonomy: Taxonomy;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Place = Term & {
  __typename?: 'Place';
  address?: Maybe<Scalars['String']['output']>;
  categories: Array<Category>;
  crossStreets: Array<CrossStreet>;
  description?: Maybe<Scalars['String']['output']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID']['output'];
  name: Scalars['String']['output'];
  neighborhood?: Maybe<Neighborhood>;
  slug: Scalars['String']['output'];
  taxonomy: Taxonomy;
};

export enum PlaceOrder {
  AToZ = 'A_TO_Z',
  UpdatedAsc = 'UPDATED_ASC',
  UpdatedDesc = 'UPDATED_DESC',
  ZToA = 'Z_TO_A'
}

export type Podcast = {
  __typename?: 'Podcast';
  audio?: Maybe<AudioUpload>;
  date?: Maybe<Scalars['Float']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ObjID']['output'];
  image?: Maybe<ImageUpload>;
  title: Scalars['String']['output'];
};

export type PodcastConnection = {
  __typename?: 'PodcastConnection';
  count: Scalars['Int']['output'];
  edges: Array<PodcastEdge>;
  pageInfo: PageInfo;
};

export type PodcastEdge = {
  __typename?: 'PodcastEdge';
  cursor: Scalars['String']['output'];
  node: Podcast;
};

export enum PodcastOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PodcastSettings = {
  __typename?: 'PodcastSettings';
  category?: Maybe<Scalars['String']['output']>;
  copyrightText?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  explicit?: Maybe<Scalars['String']['output']>;
  feedLink?: Maybe<Scalars['String']['output']>;
  generator?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<ImageUpload>;
  itunesEmail?: Maybe<Scalars['String']['output']>;
  itunesName?: Maybe<Scalars['String']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  managingEditor?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  websiteLink?: Maybe<Scalars['String']['output']>;
};

export type PodcastSettingsInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  copyrightText?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  explicit?: InputMaybe<Scalars['String']['input']>;
  feedLink?: InputMaybe<Scalars['String']['input']>;
  generator?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['ObjID']['input']>;
  itunesEmail?: InputMaybe<Scalars['String']['input']>;
  itunesName?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  managingEditor?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  websiteLink?: InputMaybe<Scalars['String']['input']>;
};

export type Post = {
  __typename?: 'Post';
  artists?: Maybe<Array<Maybe<Term>>>;
  contentState?: Maybe<ContentState>;
  date?: Maybe<Scalars['Float']['output']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID']['output'];
  slug: Scalars['String']['output'];
  status?: Maybe<PostStatus>;
  summary?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type PostConnection = {
  __typename?: 'PostConnection';
  count: Scalars['Int']['output'];
  edges: Array<PostEdge>;
  pageInfo: PageInfo;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String']['output'];
  node: Post;
};

export enum PostStatus {
  Draft = 'DRAFT',
  Publish = 'PUBLISH'
}

export type Query = {
  __typename?: 'Query';
  dashboardSettings: DashboardSettings;
  media?: Maybe<MediaUpload>;
  mediaSettings: MediaSettings;
  places?: Maybe<TermConnection>;
  podcast?: Maybe<Podcast>;
  podcastSettings: PodcastSettings;
  podcasts?: Maybe<PodcastConnection>;
  post?: Maybe<Post>;
  posts?: Maybe<PostConnection>;
  show?: Maybe<Show>;
  shows?: Maybe<ShowConnection>;
  siteSettings: SiteSettings;
  socialSettings: SocialSettings;
  taxonomies?: Maybe<TaxonomyConnection>;
  taxonomy?: Maybe<Taxonomy>;
  term?: Maybe<Term>;
  terms?: Maybe<TermConnection>;
  uploads?: Maybe<MediaUploadConnection>;
  user?: Maybe<User>;
  users?: Maybe<UserConnection>;
  video?: Maybe<Video>;
  videos?: Maybe<VideoConnection>;
};


export type QueryMediaArgs = {
  id?: InputMaybe<Scalars['ObjID']['input']>;
};


export type QueryPlacesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  crossStreets?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  neighborhoods?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  order?: InputMaybe<PlaceOrder>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPodcastArgs = {
  id?: InputMaybe<Scalars['ObjID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPodcastsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<PodcastOrder>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostArgs = {
  id?: InputMaybe<Scalars['ObjID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PostStatus>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryShowArgs = {
  id?: InputMaybe<Scalars['ObjID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryShowsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['Float']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  latest?: InputMaybe<Scalars['Boolean']['input']>;
  order?: InputMaybe<ShowOrder>;
  search?: InputMaybe<Scalars['String']['input']>;
  taxonomy?: InputMaybe<Scalars['String']['input']>;
  term?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTaxonomiesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTaxonomyArgs = {
  id?: InputMaybe<Scalars['ObjID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTermArgs = {
  id?: InputMaybe<Scalars['ObjID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  taxonomy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTermsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  taxonomy?: InputMaybe<Scalars['String']['input']>;
  taxonomyId?: InputMaybe<Scalars['ObjID']['input']>;
};


export type QueryUploadsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ObjID']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVideoArgs = {
  id?: InputMaybe<Scalars['ObjID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVideosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type Show = {
  __typename?: 'Show';
  artist: Term;
  date: Scalars['Float']['output'];
  id: Scalars['ObjID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  venue: Term;
};

export type ShowConnection = {
  __typename?: 'ShowConnection';
  count?: Maybe<Scalars['Int']['output']>;
  edges: Array<ShowEdge>;
  pageInfo: PageInfo;
};

export type ShowEdge = {
  __typename?: 'ShowEdge';
  cursor: Scalars['String']['output'];
  node: Show;
};

export enum ShowOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SiteSettings = {
  __typename?: 'SiteSettings';
  copyrightText?: Maybe<Scalars['String']['output']>;
  emailAddress?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  language?: Maybe<Scalars['String']['output']>;
  siteTitle?: Maybe<Scalars['String']['output']>;
  siteUrl?: Maybe<Scalars['String']['output']>;
  tagline?: Maybe<Scalars['String']['output']>;
};

export type SiteSettingsInput = {
  copyrightText?: InputMaybe<Scalars['String']['input']>;
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  siteTitle?: InputMaybe<Scalars['String']['input']>;
  siteUrl?: InputMaybe<Scalars['String']['input']>;
  tagline?: InputMaybe<Scalars['String']['input']>;
};

export type SocialSettings = {
  __typename?: 'SocialSettings';
  facebookAppId?: Maybe<Scalars['String']['output']>;
  facebookUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  instagramUsername?: Maybe<Scalars['String']['output']>;
  tiktokUsername?: Maybe<Scalars['String']['output']>;
  twitterUsername?: Maybe<Scalars['String']['output']>;
  youtubeUsername?: Maybe<Scalars['String']['output']>;
};

export type SocialSettingsInput = {
  facebookAppId?: InputMaybe<Scalars['String']['input']>;
  facebookUrl?: InputMaybe<Scalars['String']['input']>;
  instagramUsername?: InputMaybe<Scalars['String']['input']>;
  tiktokUsername?: InputMaybe<Scalars['String']['input']>;
  twitterUsername?: InputMaybe<Scalars['String']['input']>;
  youtubeUsername?: InputMaybe<Scalars['String']['input']>;
};

export type Taxonomy = {
  __typename?: 'Taxonomy';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ObjID']['output'];
  name: Scalars['String']['output'];
  plural?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
};

export type TaxonomyConnection = {
  __typename?: 'TaxonomyConnection';
  count: Scalars['Int']['output'];
  edges: Array<TaxonomyEdge>;
  pageInfo: PageInfo;
};

export type TaxonomyEdge = {
  __typename?: 'TaxonomyEdge';
  cursor: Scalars['String']['output'];
  node: Taxonomy;
};

export type Term = {
  description?: Maybe<Scalars['String']['output']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  taxonomy: Taxonomy;
};

export type TermConnection = {
  __typename?: 'TermConnection';
  count: Scalars['Int']['output'];
  edges: Array<TermEdge>;
  pageInfo: PageInfo;
  taxonomy: Taxonomy;
};

export type TermEdge = {
  __typename?: 'TermEdge';
  cursor: Scalars['String']['output'];
  node: Term;
};

export type UpdateMediaUploadInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePodcastInput = {
  audio?: InputMaybe<Scalars['ObjID']['input']>;
  date?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['ObjID']['input']>;
  title: Scalars['String']['input'];
};

export type UpdatePostInput = {
  artists?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentState?: InputMaybe<ContentStateInput>;
  date?: InputMaybe<Scalars['Float']['input']>;
  featuredMedia?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<PostStatus>;
  summary?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShowInput = {
  artist?: InputMaybe<Scalars['ObjID']['input']>;
  date?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  venue?: InputMaybe<Scalars['ObjID']['input']>;
};

export type UpdateTaxonomyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  plural?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTermInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  capacity?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  crossStreets?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  featuredMedia?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  neighborhood: Scalars['ObjID']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  taxonomy?: InputMaybe<Scalars['ObjID']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UpdateVideoInput = {
  dataId?: InputMaybe<Scalars['String']['input']>;
  dataPlaylistIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  dataType?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  publishedAt?: InputMaybe<Scalars['Float']['input']>;
  publishedISO?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ObjID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  count: Scalars['Int']['output'];
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type Venue = Term & {
  __typename?: 'Venue';
  address?: Maybe<Scalars['String']['output']>;
  capacity?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  taxonomy: Taxonomy;
};

export type Video = {
  __typename?: 'Video';
  createdAt: Scalars['Float']['output'];
  dataId: Scalars['String']['output'];
  dataPlaylistIds: Array<Scalars['String']['output']>;
  dataType: Scalars['String']['output'];
  id: Scalars['ObjID']['output'];
  position: Scalars['Int']['output'];
  publishedAt: Scalars['Float']['output'];
  publishedISO: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  thumbnails: Array<VideoThumbnail>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
  year: Scalars['Int']['output'];
};

export type VideoConnection = {
  __typename?: 'VideoConnection';
  count: Scalars['Int']['output'];
  edges: Array<VideoEdge>;
  pageInfo: PageInfo;
  years?: Maybe<Array<Scalars['Int']['output']>>;
};

export type VideoData = {
  __typename?: 'VideoData';
  type?: Maybe<Scalars['String']['output']>;
  video?: Maybe<Video>;
  videoId?: Maybe<Scalars['ObjID']['output']>;
};

export type VideoEdge = {
  __typename?: 'VideoEdge';
  cursor: Scalars['String']['output'];
  node: Video;
};

export type VideoThumbnail = {
  __typename?: 'VideoThumbnail';
  height: Scalars['Int']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type VideoUpload = MediaUpload & {
  __typename?: 'VideoUpload';
  description?: Maybe<Scalars['String']['output']>;
  destination: Scalars['String']['output'];
  duration?: Maybe<Scalars['Float']['output']>;
  fileName: Scalars['String']['output'];
  fileSize: Scalars['Int']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ObjID']['output'];
  mimeType: Scalars['String']['output'];
  originalName: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};
