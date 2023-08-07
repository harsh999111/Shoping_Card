import { useState } from "react";

export enum StatusEnum {
  loading = "loading",
  error = "error",
}

type StatusType = {
  state: StatusEnum;
  message: string;
  type: string;
  id?: number;
};

const useAPIStatus = () => {
  const [status, setStatus] = useState<StatusType[]>([]);

  const changeLoadingState = ({
    type,
    message,
    id,
  }: Omit<StatusType, "state">) => {
    setStatus((val) => {
      return [...val, { state: StatusEnum.loading, type, message, id }];
    });
  };

  const changeSuccessState = ({
    type,
    id,
  }: Omit<StatusType, "state" | "message">) => {
    setStatus((val) =>
      val.filter((x) => !(x.type === type && x.id === id))
    );
  };

  const changeErrorState = ({
    type,
    id,
    message,
  }: Omit<StatusType, "state">) => {
    setStatus((val) =>
      val.map((x) =>
        x.type === type && x.id === id
          ? {
              ...x,
              state: StatusEnum.error,
              message: message,
            }
          : x
      )
    );
  };

  return {
    status,
    changeLoadingState,
    changeSuccessState,
    changeErrorState
  }
};

export default useAPIStatus;
