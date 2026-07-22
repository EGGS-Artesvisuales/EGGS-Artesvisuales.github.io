(() => {
  const path = window.location.pathname;

  const supportedPrefixes = ["/ES/", "/EN/", "/MPD/", "/CHN/"];
  if (!supportedPrefixes.some((prefix) => path.startsWith(prefix))) return;

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "/assets/css/curatorial-context.css?v=20260722-1";
  document.head.append(stylesheet);

  const copy = {
    ES: {
      musoe: "<strong>Musoe</strong> no es una errata: une <em>Jusoe</em>, pseudónimo usado por Esteban Garnica durante su etapa de graffiti, con la palabra <em>Museo</em>. El nombre registra el desplazamiento entre intervención callejera, práctica mural y reconocimiento institucional.",
      serviceIntro: "Los servicios no constituyen una práctica separada de la obra. Trasladan experiencia material, visual y territorial hacia encargos, restauraciones, montajes y procesos de mediación.",
      services: [
        ["Obra autónoma", "Investigación, series, exhibiciones y archivo desarrollados desde una lógica autoral."],
        ["Obra situada y colaborativa", "Murales, comunidad, mediación y proyectos construidos en relación con un territorio y sus participantes."],
        ["Práctica profesional aplicada", "Restauración, encargos, montaje y asesoría técnica adaptados a necesidades concretas."]
      ],
      aboutIntro: "Esteban Garnica es el artista. EGGS-Studio es la plataforma autoral, productiva y editorial desde la que organiza su obra, sus proyectos y sus colaboraciones.",
      about: [
        ["Cómo se organiza la práctica", "La obra se mueve entre representación, acción y experiencia interior. Estas categorías son herramientas de lectura, no compartimentos cerrados."],
        ["Obra y oficio", "La producción autónoma, el trabajo comunitario y la práctica aplicada responden a contextos distintos, pero comparten atención a la imagen, la materia, la memoria y el espacio."],
        ["Un mapa abierto", "La estructura registra desarrollos consolidados, procesos en curso y líneas de investigación. No busca fijar definitivamente la obra, sino hacer visibles sus relaciones."]
      ]
    },
    EN: {
      musoe: "<strong>Musoe</strong> is not a typo. It combines <em>Jusoe</em>, the graffiti name used by Esteban Garnica in his youth, with the word <em>Museum</em>. The name records a movement between street intervention, mural practice and institutional recognition.",
      serviceIntro: "Services are not separate from the artwork. They transfer material, visual and territorial experience into commissions, restoration, installation and mediation processes.",
      services: [
        ["Autonomous work", "Research, series, exhibitions and archives developed through an authorial practice."],
        ["Situated and collaborative work", "Murals, community processes, mediation and projects built in relation to a territory and its participants."],
        ["Applied professional practice", "Restoration, commissions, installation and technical guidance adapted to concrete needs."]
      ],
      aboutIntro: "Esteban Garnica is the artist. EGGS-Studio is the authorial, productive and editorial platform through which he organizes his work, projects and collaborations.",
      about: [
        ["How the practice is organized", "The work moves between representation, action and inner experience. These categories are reading tools, not closed compartments."],
        ["Artwork and craft", "Autonomous production, community work and applied practice respond to different contexts while sharing an attention to image, matter, memory and space."],
        ["An open map", "The structure records consolidated developments, ongoing processes and research lines. It does not seek to fix the work permanently, but to reveal its relationships."]
      ]
    },
    MPD: {
      musoe: "<strong>Musoe</strong> wirin wedwed gelay. <em>Jusoe</em>, Esteban Garnica ñi graffiti üy, ka <em>Museo</em> dungu txawülkey. Feychi üy waria intervención, mural küdaw ka institución mew kimelgen ñi desplazamiento wirintukuley.",
      serviceIntro: "Kellun küdaw arte mew ayrı gelay. Material, visual ka mapu mew kimün encargo, restauración, montaje ka mediación rüpü mew amulniey.",
      services: [
        ["Autor ñi küdaw", "Investigación, series, pengelün ka archivo autor ñi rüpü mew dewmangelu."],
        ["Mapu mew ka kelluwün küdaw", "Mural, lof, mediación ka territorio mew koneltufe egu dewmalu proyecto."],
        ["Profesional küdaw", "Restauración, encargo, montaje ka técnica ngülam, kiñe kiñe necesidad mew adkülelu."]
      ],
      aboutIntro: "Esteban Garnica artista ngey. EGGS-Studio fey ñi autoral, producción ka editorial plataforma, chew ñi küdaw, proyecto ka kelluwün azümkey.",
      about: [
        ["Chumgechi küdaw azümküley", "Küdaw azentun, mapu mew küdaw ka püle rakizuam rüpü mew amuley. Feychi categoría kimelal müley, nütxam nürüfnoal."] ,
        ["Küdaw ka oficio", "Autor ñi producción, lof mew küdaw ka aplicada práctica kake contexto mew müley, welu az, material, memoria ka püle mew kiñe rakizuam nielu."],
        ["Nülalechi mapa", "Fachi estructura kimelkey yafülechi desarrollo, petu amulechi proceso ka investigación rüpü. Küdaw nürüfal gelay; ñi trafün pegelal müley."]
      ]
    },
    CHN: {
      musoe: "<strong>Musoe</strong> 不是拼写错误。这个名称把 Esteban Garnica 青少年时期使用的涂鸦名 <em>Jusoe</em> 与“博物馆”结合起来，记录了街头介入、壁画实践与制度认可之间的移动。",
      serviceIntro: "服务并不是与作品分离的实践，而是把材料、视觉与地域经验转化为委托、修复、安装与艺术中介过程。",
      services: [
        ["自主创作", "以作者实践为基础展开的研究、系列、展览与档案。"],
        ["在地与协作创作", "与地域及参与者共同构建的壁画、社区过程、艺术中介与项目。"],
        ["应用型专业实践", "根据具体需求展开的修复、委托、安装与技术咨询。"]
      ],
      aboutIntro: "Esteban Garnica 是艺术家。EGGS-Studio 是他组织作品、项目与合作的作者性、生产性与编辑性平台。",
      about: [
        ["实践如何组织", "作品在再现、行动与内在经验之间移动。这些类别是阅读工具，而不是封闭的隔间。"],
        ["作品与技艺", "自主创作、社区工作与应用实践面对不同语境，但共同关注图像、材料、记忆与空间。"],
        ["开放的地图", "结构记录成熟的发展、进行中的过程与研究线索。它不试图永久固定作品，而是让关系变得可见。"]
      ]
    }
  };

  function languageKey() {
    if (path.startsWith("/EN/")) return "EN";
    if (path.startsWith("/MPD/")) return "MPD";
    if (path.startsWith("/CHN/")) return "CHN";
    return "ES";
  }

  function createGridSection(className, intro, items) {
    const section = document.createElement("section");
    section.className = className;
    const itemClass = className === "practice-continuum" ? "practice-continuum__item" : "curatorial-position__item";
    const introClass = className === "practice-continuum" ? "practice-continuum__intro" : "curatorial-position__intro";
    const gridClass = className === "practice-continuum" ? "practice-continuum__grid" : "curatorial-position__grid";
    section.innerHTML = `<p class="${introClass}">${intro}</p><div class="${gridClass}">${items.map(([title, text]) => `<article class="${itemClass}"><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>`;
    return section;
  }

  function addMusoeNote(languageCopy) {
    if (!/(musoe-a-cielo-abierto|musoe-open-air)\.html$/.test(path)) return;
    if (document.querySelector(".curatorial-note")) return;
    const subtitle = document.querySelector("main .subtitulo, main h2");
    if (!subtitle) return;
    const note = document.createElement("aside");
    note.className = "curatorial-note";
    note.innerHTML = `<p>${languageCopy.musoe}</p>`;
    subtitle.after(note);
  }

  function addServicesContext(languageCopy) {
    if (!/(servicios|services)\.html$/.test(path)) return;
    if (document.querySelector(".practice-continuum")) return;
    const target = document.querySelector("main .service-cta, main .button-container");
    if (!target) return;
    target.before(createGridSection("practice-continuum", languageCopy.serviceIntro, languageCopy.services));
  }

  function addAboutContext(languageCopy) {
    if (!/(acerca|about)\.html$/.test(path)) return;
    if (document.querySelector(".curatorial-position")) return;
    const target = document.querySelector("main .button-container");
    if (!target) return;
    target.before(createGridSection("curatorial-position", languageCopy.aboutIntro, languageCopy.about));
  }

  function initialize() {
    const languageCopy = copy[languageKey()];
    addMusoeNote(languageCopy);
    addServicesContext(languageCopy);
    addAboutContext(languageCopy);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
