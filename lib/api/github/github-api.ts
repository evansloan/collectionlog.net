import { Octokit } from 'octokit';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

const REPO_API = 'collection-log-api';
const REPO_PLUGIN = 'collection-log';
const REPO_SITE = 'collectionlog.net';

type Unpacked<T> = T extends (infer U)[] ? U : T;
export type GithubRelease = Unpacked<
  RestEndpointMethodTypes['repos']['listReleases']['response']['data']
>;

export interface CollectionLogReleases {
  api: GithubRelease[];
  plugin: GithubRelease[];
  site: GithubRelease[];
}

const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

const getLoggedIn = async () => {
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  return login;
};

const getLatestRelease = async (
  params: RestEndpointMethodTypes['repos']['listReleases']['parameters']
): Promise<GithubRelease[]> => {
  const { data } = await octokit.rest.repos.listReleases({
    ...params,
    per_page: 5,
    page: 1,
  });

  return data.slice(0, data.length > 5 ? 5 : data.length);
};

export const getLatestSiteRelease = async () =>
  await getLatestRelease({
    repo: REPO_SITE,
    owner: await getLoggedIn(),
  });

export const getLatestPluginRelease = async () =>
  await getLatestRelease({
    repo: REPO_PLUGIN,
    owner: await getLoggedIn(),
  });

export const getLatestApiRelease = async () =>
  await getLatestRelease({
    repo: REPO_API,
    owner: await getLoggedIn(),
  });

export const getLatestReleases = async (): Promise<CollectionLogReleases> => ({
  api: await getLatestApiRelease(),
  plugin: await getLatestPluginRelease(),
  site: await getLatestSiteRelease(),
});
