export type NotionPage<Properties> = {
  type: string;
  id: string;
  properties: Properties;
};

export default <Properties>(
  page: NotionPage<Properties>
): Properties & { id: string } => ({
  id: page.id,
  ...page.properties,
});
