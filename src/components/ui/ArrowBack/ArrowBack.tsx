import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export const ArrowBack = () => {

  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate("/")} className="flex gap-1 items-center cursor-pointer ">
        <FontAwesomeIcon icon={faArrowLeft} />
        Voltar
      </button>
    </div>
  );
};
