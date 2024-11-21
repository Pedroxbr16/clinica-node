import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2'; // Importa o SweetAlert2

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  // Configuração do servidor STUN/TURN
  const servers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
  };

  // Inicializa a câmera e microfone
  useEffect(() => {
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        console.log('Câmera e microfone iniciados.');
      } catch (error) {
        console.error('Erro ao acessar câmera/microfone:', error);

        // Exibe um alerta ao usuário
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível acessar a câmera ou o microfone. Verifique se estão conectados e tente novamente.',
          confirmButtonText: 'Ok',
        });
      }
    };

    initMedia();
  }, []);

  // Inicia a chamada
  const startCall = async () => {
    try {
      // Cria o PeerConnection
      const pc = new RTCPeerConnection(servers);
      setPeerConnection(pc);

      // Adiciona as tracks locais
      localStream?.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });

      // Configura o recebimento do stream remoto
      const remoteMediaStream = new MediaStream();
      setRemoteStream(remoteMediaStream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteMediaStream;
      }

      pc.ontrack = (event) => {
        console.log('Recebendo stream remoto.');
        event.streams[0].getTracks().forEach((track) => {
          remoteMediaStream.addTrack(track);
        });
      };

      // Monitorar mudanças no estado ICE
      pc.oniceconnectionstatechange = () => {
        const state = pc.iceConnectionState;
        console.log(`Estado da conexão ICE: ${state}`);
        if (state === 'disconnected' || state === 'failed') {
          console.warn('Conexão instável. Tentando reconectar...');
          restartConnection();
        }
      };

      // Gerar e enviar uma oferta
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      console.log('Oferta criada:', offer);

      // Simule aqui o envio da oferta via signaling server
      // signalingServer.send(JSON.stringify({ offer }));
    } catch (error) {
      console.error('Erro ao iniciar chamada:', error);
    }
  };

  // Reinicia a conexão
  const restartConnection = () => {
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
    startCall(); // Reinicia a conexão
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Seu vídeo</h3>
      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '320px', height: '240px', marginBottom: '20px' }}
      ></video>
      <h3>Outro participante</h3>
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        style={{ width: '320px', height: '240px', marginBottom: '20px' }}
      ></video>
      <button
        onClick={startCall}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Iniciar Chamada
      </button>
    </div>
  );
};

export default VideoCall;
