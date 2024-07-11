import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@nextui-org/avatar";

function Homepage() {
  return (
    <div className={` flex w-full text-xl justify-between h-12 pt-2 pl-3`}>
      <Avatar
        src=""
        className={`
        } h-8 w-8 mt-1 ml-2 sm:hidden`}
      />
      {/* Home */}
      <div className={`flex justify-start m-auto text-blue-500`}>
        <FontAwesomeIcon
          icon={faFeather}
          className=" h-8 pb-2 mr-8"
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default Homepage;
