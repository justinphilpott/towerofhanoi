import { getDocument, queries } from 'pptr-testing-library'
const { getByText } = queries;

const localTestURI = `http://localhost:${process.env.PORT || '3000'}`;
const prodTestURI = "https://towerofhanoi.app";
const testURI = localTestURI;



describe('Initial states', () => {

  it('Loads FSM with initial state "Game"',
    async () => {
      await page.goto(testURI);
      const doc = await getDocument(page);
      const button = await getByText(doc, "Play");
      button.click();
    }
  );

  it('Loads FSM with initial state "Tutorial"',
    async () => {
      await page.goto(testURI);
      const doc = await getDocument(page);
      const button = await getByText(doc, "How to play");
      button.click();
    }
  );


});

