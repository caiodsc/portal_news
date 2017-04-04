import { PortalWebPage } from './app.po';

describe('portal-web App', () => {
  let page: PortalWebPage;

  beforeEach(() => {
    page = new PortalWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
