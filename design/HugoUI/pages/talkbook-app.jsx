// Mount the design canvas with TalkBook's two variations.

function TBVariantArtboard({ Variation, defaultLang = "es", defaultTheme = "dark" }) {
  const [lang, setLang] = useState(defaultLang);
  const [theme, setTheme] = useState(defaultTheme);
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

function TBApp() {
  return (
    <DesignCanvas
      title="TalkBook — página de proyecto"
      subtitle="Dos direcciones para el case study móvil: misma estructura que Tesora, mocks de iOS dentro"
    >
      <DCSection id="project-page-talkbook" title="Página de proyecto — TalkBook"
                 subtitle="Hover en el stack, click en las capturas para abrir lightbox, play en el vídeo">
        <DCArtboard id="a" label="A · Editorial silencioso" width={1280} height={4350}>
          <TBVariantArtboard Variation={TBVariationA}/>
        </DCArtboard>
        <DCArtboard id="b" label="B · Asimétrico editorial" width={1280} height={4300}>
          <TBVariantArtboard Variation={TBVariationB}/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<TBApp/>);
