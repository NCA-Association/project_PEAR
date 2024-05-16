import { fetchHandler, getPatchOptions, getPostOptions } from "../utils";

const baseUrl = '/api/programs';

export const createProgram = async ({name,bio, website_url,borough, organization_id, img_url, color, rating}) => (
  console.log(await fetchHandler(baseUrl, getPostOptions({name,bio, website_url,borough, organization_id, img_url, color, rating})))
)

export const getAllPrograms = async () => {
  const [programs] = await fetchHandler(baseUrl)
  return programs ;
}

export const getProgramById  = async (id) => {
  console.log(await fetchHandler(`${baseUrl}/${id}`))
};

export const updateProgram = async({id,name,bio, website_url, borough, organization_id, img_url, color}) => (
  console.log(await fetchHandler(`${baseUrl}/${id}`, getPatchOptions({name,bio,website_url,borough,organization_id,img_url,color})))
)