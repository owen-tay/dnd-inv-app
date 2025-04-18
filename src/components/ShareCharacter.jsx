import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, ref, getDatabase } from "firebase/database";
import ViewCharacter from "./ViewCharacter";


export default function ShareCharacter() {
  const { token } = useParams();
  const [uid, setUid] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const db = getDatabase();
    get(ref(db, `shareTokens/${token}`)).then((snap) => {
      if (snap.exists()) setUid(snap.val());
      else               setNotFound(true);
    });
  }, [token]);

  if (notFound)
    return <p className="text-center  mt-20 text-error text-xl">Invalid share link.</p>;

  if (!uid)
    return <p className="text-center mt-20">Loading&nbsp;…</p>;

  return <ViewCharacter user={{ uid }} readOnly />;
}
