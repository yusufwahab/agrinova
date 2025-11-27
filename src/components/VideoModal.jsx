import Modal from './Modal';

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Watch Demo" size="lg">
      <div className="aspect-w-16 aspect-h-9 w-full">
        <iframe
          title="AgroGuard Demo"
          src={videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-96 rounded-lg"
        />
      </div>
    </Modal>
  );
};

export default VideoModal;
