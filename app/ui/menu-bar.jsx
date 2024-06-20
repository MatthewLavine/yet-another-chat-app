import Link from "next/link";

import { faHouse, faGear, faY } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenuBar() {
  return (
    <>
      <div className="flex w-16 flex-none flex-col bg-slate-200">
        <Link href="/" className="p-5">
          <FontAwesomeIcon icon={faY} />
        </Link>
        <Link href="/" className="p-5">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <Link href="/settings" className="p-5">
          <FontAwesomeIcon icon={faGear} />
        </Link>
        <Link href="" className="p-5">
          <FontAwesomeIcon icon={faGithub} />
        </Link>
      </div>
    </>
  );
}
