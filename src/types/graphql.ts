export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ObjID: any;
};

export type Artist = Term & {
  __typename?: 'Artist';
  description?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  taxonomy: Taxonomy;
};

export type AudioUpload = MediaUpload & {
  __typename?: 'AudioUpload';
  album?: Maybe<Scalars['String']>;
  albumArtist?: Maybe<Array<Maybe<Scalars['String']>>>;
  artist?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  destination: Scalars['String'];
  duration?: Maybe<Scalars['Float']>;
  fileName: Scalars['String'];
  fileSize: Scalars['Int'];
  genre?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['ObjID'];
  images?: Maybe<Array<Maybe<ImageUploadCrop>>>;
  mimeType: Scalars['String'];
  originalName: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  year?: Maybe<Scalars['Int']>;
};

export type Block = {
  __typename?: 'Block';
  data?: Maybe<Data>;
  depth?: Maybe<Scalars['Int']>;
  entityRanges?: Maybe<Array<Maybe<EntityRange>>>;
  inlineStyleRanges?: Maybe<Array<Maybe<InlineStyleRange>>>;
  key?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type BlockInput = {
  data?: InputMaybe<DataInput>;
  depth?: InputMaybe<Scalars['Int']>;
  entityRanges?: InputMaybe<Array<InputMaybe<EntityRangeInput>>>;
  inlineStyleRanges?: InputMaybe<Array<InputMaybe<InlineStyleRangeInput>>>;
  key?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Category = Term & {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID'];
  name: Scalars['String'];
  slug: Scalars['String'];
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
  audio?: InputMaybe<Scalars['ObjID']>;
  date?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['ObjID']>;
  title: Scalars['String'];
};

export type CreatePostInput = {
  artists?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentState?: InputMaybe<ContentStateInput>;
  date?: InputMaybe<Scalars['Float']>;
  featuredMedia?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  status?: InputMaybe<PostStatus>;
  summary?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateShowInput = {
  artist: Scalars['ObjID'];
  date: Scalars['Float'];
  notes?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
  venue: Scalars['ObjID'];
};

export type CreateTaxonomyInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  plural?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type CreateTermInput = {
  address?: InputMaybe<Scalars['String']>;
  capacity?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  crossStreets?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description?: InputMaybe<Scalars['String']>;
  featuredMedia?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name: Scalars['String'];
  neighborhood?: InputMaybe<Scalars['ObjID']>;
  slug?: InputMaybe<Scalars['String']>;
  taxonomy: Scalars['ObjID'];
};

export type CreateUserInput = {
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CreateVideoInput = {
  dataId?: InputMaybe<Scalars['String']>;
  dataPlaylistIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  dataType?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  publishedAt: Scalars['Float'];
  publishedISO?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  year: Scalars['Int'];
};

export type CrossStreet = Term & {
  __typename?: 'CrossStreet';
  description?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  taxonomy: Taxonomy;
};

export type DashboardSettings = {
  __typename?: 'DashboardSettings';
  googleClientId?: Maybe<Scalars['String']>;
  googleTrackingId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type DashboardSettingsInput = {
  googleClientId?: InputMaybe<Scalars['String']>;
  googleTrackingId?: InputMaybe<Scalars['String']>;
};

export type Data = {
  __typename?: 'Data';
  id?: Maybe<Scalars['String']>;
};

export type DataInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type EmbedData = {
  __typename?: 'EmbedData';
  html?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Entity = {
  __typename?: 'Entity';
  data?: Maybe<EntityData>;
  mutability?: Maybe<EntityMutability>;
  type?: Maybe<EntityType>;
};

export type EntityData = EmbedData | ImageData | LinkData | VideoData;

export type EntityDataInput = {
  href?: InputMaybe<Scalars['String']>;
  html?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
  videoId?: InputMaybe<Scalars['String']>;
};

export type EntityInput = {
  data?: InputMaybe<EntityDataInput>;
  mutability?: InputMaybe<EntityMutability>;
  type?: InputMaybe<EntityType>;
};

export enum EntityMutability {
  Immutable = 'IMMUTABLE',
  Mutable = 'MUTABLE',
  Segmented = 'SEGMENTED',
}

export type EntityRange = {
  __typename?: 'EntityRange';
  key?: Maybe<Scalars['Int']>;
  length?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type EntityRangeInput = {
  key?: InputMaybe<Scalars['Int']>;
  length?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export enum EntityType {
  Embed = 'EMBED',
  Image = 'IMAGE',
  Link = 'LINK',
  Photo = 'PHOTO',
  Token = 'TOKEN',
  Video = 'VIDEO',
}

export type FileUpload = MediaUpload & {
  __typename?: 'FileUpload';
  description?: Maybe<Scalars['String']>;
  destination: Scalars['String'];
  fileName: Scalars['String'];
  fileSize: Scalars['Int'];
  id: Scalars['ObjID'];
  mimeType: Scalars['String'];
  originalName: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type ImageData = {
  __typename?: 'ImageData';
  image?: Maybe<ImageUpload>;
  imageId?: Maybe<Scalars['ObjID']>;
  size?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ImageUpload = MediaUpload & {
  __typename?: 'ImageUpload';
  altText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  crops: Array<ImageUploadCrop>;
  destination: Scalars['String'];
  fileName: Scalars['String'];
  fileSize: Scalars['Int'];
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ObjID'];
  mimeType: Scalars['String'];
  originalName: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type ImageUploadCrop = {
  __typename?: 'ImageUploadCrop';
  fileName: Scalars['String'];
  fileSize: Scalars['Int'];
  height: Scalars['Int'];
  width: Scalars['Int'];
};

export type ImageUploadCropInput = {
  fileName?: InputMaybe<Scalars['String']>;
  fileSize?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type InlineStyleRange = {
  __typename?: 'InlineStyleRange';
  length?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  style?: Maybe<Scalars['String']>;
};

export type InlineStyleRangeInput = {
  length?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  style?: InputMaybe<Scalars['String']>;
};

export type LinkData = {
  __typename?: 'LinkData';
  href?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type MediaCropSetting = {
  __typename?: 'MediaCropSetting';
  height?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type MediaCropSettingInput = {
  height?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type MediaSettings = {
  __typename?: 'MediaSettings';
  crops: Array<MediaCropSetting>;
  id: Scalars['String'];
};

export type MediaSettingsInput = {
  crops?: InputMaybe<Array<InputMaybe<MediaCropSettingInput>>>;
};

export type MediaUpload = {
  destination: Scalars['String'];
  fileName: Scalars['String'];
  fileSize: Scalars['Int'];
  id: Scalars['ObjID'];
  mimeType: Scalars['String'];
  originalName: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type MediaUploadConnection = {
  __typename?: 'MediaUploadConnection';
  count: Scalars['Int'];
  edges: Array<MediaUploadEdge>;
  mimeTypes?: Maybe<Array<Scalars['String']>>;
  pageInfo: PageInfo;
  types?: Maybe<Array<Scalars['String']>>;
};

export type MediaUploadEdge = {
  __typename?: 'MediaUploadEdge';
  cursor: Scalars['String'];
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
  removeMediaUpload?: Maybe<Scalars['Boolean']>;
  removePodcast?: Maybe<Scalars['Boolean']>;
  removePost?: Maybe<Scalars['Boolean']>;
  removeShow?: Maybe<Scalars['Boolean']>;
  removeTaxonomy?: Maybe<Scalars['Boolean']>;
  removeTerm?: Maybe<Scalars['Boolean']>;
  removeUser?: Maybe<Scalars['Boolean']>;
  removeVideo?: Maybe<Scalars['Boolean']>;
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
  ids: Array<InputMaybe<Scalars['ObjID']>>;
};

export type MutationRemovePodcastArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']>>;
};

export type MutationRemovePostArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']>>;
};

export type MutationRemoveShowArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']>>;
};

export type MutationRemoveTaxonomyArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']>>;
};

export type MutationRemoveTermArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']>>;
};

export type MutationRemoveUserArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']>>;
};

export type MutationRemoveVideoArgs = {
  ids: Array<InputMaybe<Scalars['ObjID']>>;
};

export type MutationUpdateDashboardSettingsArgs = {
  id: Scalars['String'];
  input: DashboardSettingsInput;
};

export type MutationUpdateMediaSettingsArgs = {
  id: Scalars['String'];
  input: MediaSettingsInput;
};

export type MutationUpdateMediaUploadArgs = {
  id: Scalars['ObjID'];
  input: UpdateMediaUploadInput;
};

export type MutationUpdatePodcastArgs = {
  id: Scalars['ObjID'];
  input: UpdatePodcastInput;
};

export type MutationUpdatePodcastSettingsArgs = {
  id: Scalars['String'];
  input: PodcastSettingsInput;
};

export type MutationUpdatePostArgs = {
  id: Scalars['ObjID'];
  input: UpdatePostInput;
};

export type MutationUpdateShowArgs = {
  id: Scalars['ObjID'];
  input: UpdateShowInput;
};

export type MutationUpdateSiteSettingsArgs = {
  id: Scalars['String'];
  input: SiteSettingsInput;
};

export type MutationUpdateSocialSettingsArgs = {
  id: Scalars['String'];
  input: SocialSettingsInput;
};

export type MutationUpdateTaxonomyArgs = {
  id: Scalars['ObjID'];
  input: UpdateTaxonomyInput;
};

export type MutationUpdateTermArgs = {
  id: Scalars['ObjID'];
  input: UpdateTermInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ObjID'];
  input: UpdateUserInput;
};

export type MutationUpdateVideoArgs = {
  id: Scalars['ObjID'];
  input: UpdateVideoInput;
};

export type Neighborhood = Term & {
  __typename?: 'Neighborhood';
  description?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  taxonomy: Taxonomy;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['String']>;
};

export type Place = Term & {
  __typename?: 'Place';
  address?: Maybe<Scalars['String']>;
  categories: Array<Category>;
  crossStreets: Array<CrossStreet>;
  description?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID'];
  name: Scalars['String'];
  neighborhood?: Maybe<Neighborhood>;
  slug: Scalars['String'];
  taxonomy: Taxonomy;
};

export enum PlaceOrder {
  AToZ = 'A_TO_Z',
  UpdatedAsc = 'UPDATED_ASC',
  UpdatedDesc = 'UPDATED_DESC',
  ZToA = 'Z_TO_A',
}

export type Podcast = {
  __typename?: 'Podcast';
  audio?: Maybe<AudioUpload>;
  date?: Maybe<Scalars['Float']>;
  description: Scalars['String'];
  id: Scalars['ObjID'];
  image?: Maybe<ImageUpload>;
  title: Scalars['String'];
};

export type PodcastConnection = {
  __typename?: 'PodcastConnection';
  count: Scalars['Int'];
  edges: Array<PodcastEdge>;
  pageInfo: PageInfo;
};

export type PodcastEdge = {
  __typename?: 'PodcastEdge';
  cursor: Scalars['String'];
  node: Podcast;
};

export enum PodcastOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type PodcastSettings = {
  __typename?: 'PodcastSettings';
  category?: Maybe<Scalars['String']>;
  copyrightText?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  explicit?: Maybe<Scalars['String']>;
  feedLink?: Maybe<Scalars['String']>;
  generator?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<ImageUpload>;
  itunesEmail?: Maybe<Scalars['String']>;
  itunesName?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  managingEditor?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  websiteLink?: Maybe<Scalars['String']>;
};

export type PodcastSettingsInput = {
  category?: InputMaybe<Scalars['String']>;
  copyrightText?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  explicit?: InputMaybe<Scalars['String']>;
  feedLink?: InputMaybe<Scalars['String']>;
  generator?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['ObjID']>;
  itunesEmail?: InputMaybe<Scalars['String']>;
  itunesName?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  managingEditor?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  websiteLink?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  artists?: Maybe<Array<Term>>;
  contentState?: Maybe<ContentState>;
  date?: Maybe<Scalars['Float']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID'];
  slug: Scalars['String'];
  status?: Maybe<PostStatus>;
  summary?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type PostConnection = {
  __typename?: 'PostConnection';
  count: Scalars['Int'];
  edges: Array<PostEdge>;
  pageInfo: PageInfo;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String'];
  node: Post;
};

export enum PostStatus {
  Draft = 'DRAFT',
  Publish = 'PUBLISH',
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
  id?: InputMaybe<Scalars['ObjID']>;
};

export type QueryPlacesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  crossStreets?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  neighborhoods?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order?: InputMaybe<PlaceOrder>;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryPodcastArgs = {
  id?: InputMaybe<Scalars['ObjID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type QueryPodcastsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<PodcastOrder>;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryPostArgs = {
  id?: InputMaybe<Scalars['ObjID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<PostStatus>;
  year?: InputMaybe<Scalars['Int']>;
};

export type QueryShowArgs = {
  id?: InputMaybe<Scalars['ObjID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type QueryShowsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Float']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  latest?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<ShowOrder>;
  search?: InputMaybe<Scalars['String']>;
  taxonomy?: InputMaybe<Scalars['String']>;
  term?: InputMaybe<Scalars['String']>;
};

export type QueryTaxonomiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryTaxonomyArgs = {
  id?: InputMaybe<Scalars['ObjID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type QueryTermArgs = {
  id?: InputMaybe<Scalars['ObjID']>;
  slug?: InputMaybe<Scalars['String']>;
  taxonomy?: InputMaybe<Scalars['String']>;
};

export type QueryTermsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  taxonomy?: InputMaybe<Scalars['String']>;
  taxonomyId?: InputMaybe<Scalars['ObjID']>;
};

export type QueryUploadsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  mimeType?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type QueryUserArgs = {
  id: Scalars['ObjID'];
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryVideoArgs = {
  id?: InputMaybe<Scalars['ObjID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type QueryVideosArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type Show = {
  __typename?: 'Show';
  artist: Term;
  date: Scalars['Float'];
  id: Scalars['ObjID'];
  notes?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  venue: Term;
};

export type ShowConnection = {
  __typename?: 'ShowConnection';
  count?: Maybe<Scalars['Int']>;
  edges: Array<ShowEdge>;
  pageInfo: PageInfo;
};

export type ShowEdge = {
  __typename?: 'ShowEdge';
  cursor: Scalars['String'];
  node: Show;
};

export enum ShowOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type SiteSettings = {
  __typename?: 'SiteSettings';
  copyrightText?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  siteTitle?: Maybe<Scalars['String']>;
  siteUrl?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
};

export type SiteSettingsInput = {
  copyrightText?: InputMaybe<Scalars['String']>;
  emailAddress?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  siteTitle?: InputMaybe<Scalars['String']>;
  siteUrl?: InputMaybe<Scalars['String']>;
  tagline?: InputMaybe<Scalars['String']>;
};

export type SocialSettings = {
  __typename?: 'SocialSettings';
  facebookAppId?: Maybe<Scalars['String']>;
  facebookUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  instagramUsername?: Maybe<Scalars['String']>;
  tiktokUsername?: Maybe<Scalars['String']>;
  twitterUsername?: Maybe<Scalars['String']>;
  youtubeUsername?: Maybe<Scalars['String']>;
};

export type SocialSettingsInput = {
  facebookAppId?: InputMaybe<Scalars['String']>;
  facebookUrl?: InputMaybe<Scalars['String']>;
  instagramUsername?: InputMaybe<Scalars['String']>;
  tiktokUsername?: InputMaybe<Scalars['String']>;
  twitterUsername?: InputMaybe<Scalars['String']>;
  youtubeUsername?: InputMaybe<Scalars['String']>;
};

export type Taxonomy = {
  __typename?: 'Taxonomy';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ObjID'];
  name: Scalars['String'];
  plural?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
};

export type TaxonomyConnection = {
  __typename?: 'TaxonomyConnection';
  count: Scalars['Int'];
  edges: Array<TaxonomyEdge>;
  pageInfo: PageInfo;
};

export type TaxonomyEdge = {
  __typename?: 'TaxonomyEdge';
  cursor: Scalars['String'];
  node: Taxonomy;
};

export type Term = {
  description?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  taxonomy: Taxonomy;
};

export type TermConnection = {
  __typename?: 'TermConnection';
  count: Scalars['Int'];
  edges: Array<TermEdge>;
  pageInfo: PageInfo;
  taxonomy: Taxonomy;
};

export type TermEdge = {
  __typename?: 'TermEdge';
  cursor: Scalars['String'];
  node: Term;
};

export type UpdateMediaUploadInput = {
  altText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdatePodcastInput = {
  audio?: InputMaybe<Scalars['ObjID']>;
  date?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['ObjID']>;
  title: Scalars['String'];
};

export type UpdatePostInput = {
  artists?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contentState?: InputMaybe<ContentStateInput>;
  date?: InputMaybe<Scalars['Float']>;
  featuredMedia?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  status?: InputMaybe<PostStatus>;
  summary?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateShowInput = {
  artist?: InputMaybe<Scalars['ObjID']>;
  date?: InputMaybe<Scalars['Float']>;
  notes?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  venue?: InputMaybe<Scalars['ObjID']>;
};

export type UpdateTaxonomyInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  plural?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type UpdateTermInput = {
  address?: InputMaybe<Scalars['String']>;
  capacity?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  crossStreets?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description?: InputMaybe<Scalars['String']>;
  featuredMedia?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  neighborhood: Scalars['ObjID'];
  slug?: InputMaybe<Scalars['String']>;
  taxonomy?: InputMaybe<Scalars['ObjID']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UpdateVideoInput = {
  dataId?: InputMaybe<Scalars['String']>;
  dataPlaylistIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  dataType?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  publishedAt?: InputMaybe<Scalars['Float']>;
  publishedISO?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ObjID'];
  name?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  count: Scalars['Int'];
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type Venue = Term & {
  __typename?: 'Venue';
  address?: Maybe<Scalars['String']>;
  capacity?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<Array<MediaUpload>>;
  id: Scalars['ObjID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  taxonomy: Taxonomy;
};

export type Video = {
  __typename?: 'Video';
  createdAt: Scalars['Float'];
  dataId: Scalars['String'];
  dataPlaylistIds: Array<Scalars['String']>;
  dataType: Scalars['String'];
  id: Scalars['ObjID'];
  position: Scalars['Int'];
  publishedAt: Scalars['Float'];
  publishedISO: Scalars['String'];
  slug: Scalars['String'];
  thumbnails: Array<VideoThumbnail>;
  title: Scalars['String'];
  updatedAt: Scalars['Float'];
  year: Scalars['Int'];
};

export type VideoConnection = {
  __typename?: 'VideoConnection';
  count: Scalars['Int'];
  edges: Array<VideoEdge>;
  pageInfo: PageInfo;
  years?: Maybe<Array<Scalars['Int']>>;
};

export type VideoData = {
  __typename?: 'VideoData';
  type?: Maybe<Scalars['String']>;
  video?: Maybe<Video>;
  videoId?: Maybe<Scalars['ObjID']>;
};

export type VideoEdge = {
  __typename?: 'VideoEdge';
  cursor: Scalars['String'];
  node: Video;
};

export type VideoThumbnail = {
  __typename?: 'VideoThumbnail';
  height: Scalars['Int'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type VideoUpload = MediaUpload & {
  __typename?: 'VideoUpload';
  description?: Maybe<Scalars['String']>;
  destination: Scalars['String'];
  duration?: Maybe<Scalars['Float']>;
  fileName: Scalars['String'];
  fileSize: Scalars['Int'];
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ObjID'];
  mimeType: Scalars['String'];
  originalName: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};
