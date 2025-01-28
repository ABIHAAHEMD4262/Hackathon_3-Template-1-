import { groq } from "next-sanity";


export const AllProducts= groq `*[_type == 'products']`;
export const four = groq `*[_type == 'products'][0..3]`;
export const selling = groq `*[_type == 'products'][4..7]`;
