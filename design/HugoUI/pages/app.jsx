// Mount the design canvas with the two variations.
const { useState: useS } = React;

function VariantArtboard({ Variation, defaultLang = "es", defaultTheme = "dark" }) {
  const [lang, setLang] = useS(defaultLang);
  const [theme, setTheme] = useS(defaultTheme);
  return (
    <div className={theme} data-theme={theme}
         style={{
           width: "100%", height: "100%",
           background: "var(--bg-primary)",
           color: "var(--text-primary)",
           overflow: "hidden",
         }}>
      <Variation lang={lang} setLang={setLang} theme={theme} setTheme={setTheme}/>
    </div>
  );
}

function App() {
  return (
    <DesignCanvas
      title="Tesora — página de proyecto"
      subtitle="Dos direcciones para la nueva plantilla de case study"
    >
      <DCSection id="project-page" title="Página de proyecto — Tesora"
                 subtitle="Hover en el stack, click en las capturas para abrir lightbox, play en el vídeo">
        <DCArtboard id="a" label="A · Editorial silencioso" width={1280} height={4200}>
          <VariantArtboard Variation={VariationA}/>
        </DCArtboard>
        <DCArtboard id="b" label="B · Asimétrico editorial" width={1280} height={4150}>
          <VariantArtboard Variation={VariationB}/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
