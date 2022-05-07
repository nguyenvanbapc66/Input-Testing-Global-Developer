import { axiosClient } from '../api-client/axios-client';

type ListCateGoryOptionsResponse = {
  trivia_categories: { id: number; name: string }[];
};

type ParamsDetailCategoriesType = {
  amount: number | undefined;
  category: number | undefined;
  difficulty: string | undefined;
  type: string | undefined;
};

export type DetailCategriesResponse = {
  results: {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string[];
  }[];
};

export type DetailCategriesType = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string[];
};

export const homeApi = {
  getCategories(): Promise<ListCateGoryOptionsResponse> {
    return axiosClient.get('/api_category.php');
  },
  getDetailCategries(params: ParamsDetailCategoriesType): Promise<DetailCategriesResponse> {
    return axiosClient.get('/api.php', {
      params,
    });
  },
};
