/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getArticle = `query GetArticle($id: ID!) {
  getArticle(id: $id) {
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
export const listArticles = `query ListArticles(
  $filter: ModelArticleFilterInput
  $limit: Int
  $nextToken: String
) {
  listArticles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      headline
      description
      hyperlink
      outlet
      newsletter
      issueNumber
    }
    nextToken
  }
}
`;
