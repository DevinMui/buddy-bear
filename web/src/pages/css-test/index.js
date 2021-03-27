import styled from "styled-components"

const Color = styled.div`
    height: 180px; width: 180px; margin: 16px;
    color: white;
`

function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
            <Color className="primary-i card-i">.primary-i</Color>
            <Color className="primary-ii card-ii">.primary-ii</Color>
            <Color className="text-color card-iii">.text-color</Color>
        </div>
        <div className="col">
            <Color className="accent-i card-i">.accent-i</Color>
            <Color className="accent-ii card-ii">.accent-ii</Color>
            <Color className="card-iii"><div style={{color: 'var(--text-color)'}}>Default</div></Color>
        </div>
        <div className="col">
          <h1>Header</h1>
          <h2>Header 2</h2>
          <h3>Header 3</h3>
          <div className="standalone-text">Standalone Text</div>
          <div className="disabled">Disabled</div>
          <div className="emphasis">Emphasis</div>
          <div className="error">Error</div>
          <div className="small-text">Smaller Text Size</div>
          <p>
            Long Text (80% Transparency) Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Maecenas fringilla massa ac arcu pretium, quis
            lobortis nisl imperdiet. Curabitur sit amet vestibulum est. Cras
            aliquam ligula eu commodo pellentesque. Vestibulum justo nisi,
            consequat sed risus id, fermentum placerat libero. Sed finibus justo
            non ipsum luctus semper. Dui
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
