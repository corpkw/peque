import { useState, useEffect } from "react";
import "./App.css";
import nutria from "./assets/nutria.jpg";
import playa from "./assets/playa.jpeg";
import mano from "./assets/mano.jpeg";
import boleto from "./assets/boleto.png";

/* 📅 FECHA LÍMITE: Sábado 17 de enero 2026 - 11:59 PM */
const FECHA_LIMITE = new Date(2026, 0, 17, 23, 59, 0); // Mes 0 = enero

const adivinanzas = [
  {
    pregunta:
      "Vive en el silencio, no se compra ni se presta, cuando el mundo se acelera, es lo único que resta. ¿Qué es?",
    respuesta: "calma",
  },
  {
    pregunta:
      "Nací sin fuego y aun así transformo, el tiempo no me cocina, pero el instante sí. Vengo del agua, muero dos veces y renazco en ácido. ¿Qué soy?",
    respuesta: "ceviche",
  },
  {
    pregunta:
      "No soy tierra ni soy agua, pero existo solo cuando ambas se encuentran. El tiempo me escribe cada día y cada día vuelvo a empezar. ¿Qué es?",
    respuesta: "playa",
  },
  {
    pregunta:
      "No es un órgano ni un latido, pero cuando digo tu nombre se completa el corazón.",
    respuesta: "nosotros",
  },
];

export default function App() {
  const [respuesta, setRespuesta] = useState("");
  const [step, setStep] = useState(-1);
  const [intentosAceptar, setIntentosAceptar] = useState(0);
  const [mostrarMentira, setMostrarMentira] = useState(false);

  /* ⏳ TIEMPO RESTANTE HASTA LA FECHA LÍMITE */
  const [tiempo, setTiempo] = useState(() => {
    const ahora = new Date();
    const diff = Math.floor((FECHA_LIMITE - ahora) / 1000);
    return diff > 0 ? diff : 0;
  });

  /* ⏱️ CONTADOR POR FECHA */
  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = new Date();
      const diff = Math.floor((FECHA_LIMITE - ahora) / 1000);
      setTiempo(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  /* 🔑 RESET SECRETO (Ctrl + Shift + R) */
  useEffect(() => {
    const teclaSecreta = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "r") {
        const ahora = new Date();
        const diff = Math.floor((FECHA_LIMITE - ahora) / 1000);
        setTiempo(diff > 0 ? diff : 0);
        setStep(-1);
        setRespuesta("");
        setIntentosAceptar(0);
        setMostrarMentira(false);
      }
    };

    window.addEventListener("keydown", teclaSecreta);
    return () => window.removeEventListener("keydown", teclaSecreta);
  }, []);

  const formatoTiempo = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const HeaderTiempo = () => (
    <p style={{ textAlign: "center", color: "#ff4d6d", fontWeight: "bold" }}>
      ⏳ Tiempo restante: {formatoTiempo(tiempo)}
    </p>
  );

  const normalizar = (txt) =>
    txt
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const verificarRespuestaCorazon = () => {
    if (normalizar(respuesta) === "corazon sincero") {
      setStep(1);
      setRespuesta("");
    } else {
      alert("Respuesta incorrecta mi Peque 💗");
    }
  };

  const verificarAdivinanza = () => {
    if (normalizar(respuesta) === adivinanzas[step - 1].respuesta) {
      setStep(step + 1);
      setRespuesta("");
    } else {
      alert("Te la creíste Peque ❤️");
    }
  };

  /* ⛔ BLOQUEO TOTAL POR TIEMPO */
  if (tiempo <= 0) {
    return (
      <div className="container ganador">
        <div className="card">
          <h1>⏰ Se acabó el tiempo</h1>
          <p>
            Llegaste tarde, Mi Peque…  
            <br />
            ahora el destino decide 😌
          </p>
        </div>
      </div>
    );
  }

  /* 🌸 INTRO */
  if (step === -1) {
    return (
      <div className="container">
        <div className="card">
          <HeaderTiempo />
          <h1>Antes de empezar Peque 💖</h1>
          <p>
            Este juego tiene una sola regla…  
            <br />
            el tiempo no espera ⏳
          </p>
          <img src={nutria} alt="nutria" width={100} />
          <p>¿Aceptas jugar? ❤️</p>
          <button onClick={() => setStep(0)}>Acepto ❤️</button>
        </div>
      </div>
    );
  }

  /* 💞 DECISIÓN FINAL */
  if (step > adivinanzas.length && !mostrarMentira) {
    return (
      <div className="container ganador">
        <div className="card">
          <HeaderTiempo />
          <h1>💖 Una última decisión</h1>
          <p>Después de todo esto… </p>
           <p> ¿Aceptas ser mi enamorada?</p>
                    <img
            src={mano}
            alt="mano"
            width={180}
            style={{ borderRadius: "5px", marginTop: "5px", marginBottom: "5px"  }}
          />
          <button
            onClick={() => {
              setIntentosAceptar(intentosAceptar + 1);
              alert("No puedes aceptar… el destino ya está escrito 💕");
            }}
          >
            Aceptar ❤️
          </button>
            
          <button
            style={{ marginTop: "10px", background: "#ff4d6d" }}
            onClick={() => setMostrarMentira(true)}
          >
            Rechazar 💔
          </button>

          {intentosAceptar > 0 && (
            <p style={{ marginTop: "15px", fontStyle: "italic" }}>
              Intentos de aceptar: {intentosAceptar} 😌
            </p>
          )}

        </div>
      </div>
    );
  }

  /* 🌊 TODO ERA MENTIRA */
  if (mostrarMentira) {
    return (
      <div className="container ganador">
        <div className="card">
          <HeaderTiempo />
          <h1>Todo era mentira Peque 💖</h1>
          <p>
            Nunca tuviste opción, Mi Peque 💖  
            <br />
            el plan siempre fue este.
          </p>

          <img
            src={playa}
            alt="Destino"
            width={300}
            style={{ borderRadius: "15px", marginTop: "15px" }}
          />
                    <img
            src={boleto}
            alt="Destino"
            width={300}
            style={{ borderRadius: "15px", marginTop: "15px" }}
          />

          <p style={{ marginTop: "15px", fontWeight: "bold" }}>
            🌊 ¿ Vamos ?
          </p>
        </div>
      </div>
    );
  }

  /* ❤️ CORAZÓN */
  if (step === 0) {
    return (
      <div className="container">
        <div className="card">
          <HeaderTiempo />
          <h2>Adivinanza 0 ❤️</h2>

          <div className="corazon-contenedor">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/512px-Love_Heart_SVG.svg.png"
              alt="Corazón"
              className="imagen"
            />

            <div className="numeros">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <div key={n}>
                  <span className={`n${n}`}>{n}</span>
                  <span className={`n1${n}`}>{n}</span>
                </div>
              ))}
            </div>
          </div>

          <input
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Tú puedes Peque"
          />

          <button onClick={verificarRespuestaCorazon}>OK</button>
        </div>
      </div>
    );
  }

  /* ❤️ ADIVINANZAS */
  return (
    <div className="container">
      <div className="card">
        <HeaderTiempo />
        <h2>Adivinanza {step} ❤️</h2>
        <p>{adivinanzas[step - 1].pregunta}</p>

        <input
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          placeholder="Tú puedes Peque ❤️"
          onKeyDown={(e) => e.key === "Enter" && verificarAdivinanza()}
        />

        <button onClick={verificarAdivinanza}>Responder</button>
      </div>
    </div>
  );
}