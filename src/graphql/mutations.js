/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createArticle = `mutation CreateArticle(
  $input: CreateArticleInput!
  $condition: ModelArticleConditionInput
) {
  createArticle(input: $input, condition: $condition) {
    id
    headline
    description
    hyperlink
    outlet
    newsletter
    issueNumber
  }
}
`;
export const updateArticle = `mutation UpdateArticle(
  $input: UpdateArticleInput!
  $condition: ModelArticleConditionInput
) {
  updateArticle(input: $input, condition: $condition) {
    id
    headline
    description
    hyperlink
    outlet
    newsletter
    issueNumber
  }
}
`;
export const deleteArticle = `mutation DeleteArticle(
  $input: DeleteArticleInput!
  $condition: ModelArticleConditionInput
) {
  deleteArticle(input: $input, condition: $condition) {
    id
    headline
    description
    hyperlink
    outlet
    newsletter
    issueNumber
  }
}
`;
