import { useEffect, useState, type FC } from "react";
import { Button, ToggleSwitch, TextInput, Select } from "flowbite-react";
import "~/src/index.css";

type CaseInfo = {
  label: string;
};

type CaseGroup = {
  [caseKey: string]: CaseInfo;
};

type ApiInfo = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  detail?: string;
};

interface FirstKimProps {
  apies: Record<string, ApiInfo>;
  cases: Record<string, CaseGroup>;
  mocks: {
    [key: string]: { isOn: boolean; selectedCase: "default" | string };
  };
  onChangeSelectCase: (apiPath: string, selectedCase: string) => void;
}

const FirstKim: FC<FirstKimProps> = ({
  apies,
  mocks,
  cases,
  onChangeSelectCase,
}) => {
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("mock-gui-storage");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setIsAllChecked(parsedData.isAllOn || false);
    } else {
      localStorage.setItem(
        "mock-gui-storage",
        JSON.stringify({ isAllOn: false })
      );
    }
  }, []);

  return (
    <div className="fixed bottom-0 right-0 bg-black shadow-md text-white">
      <div className="border-2 border-yellow-600 rounded-lg flex flex-col p-4 gap-4">
        <div className="flex justify-between gap-4">
          <span>KIM-GIU</span>
          <div>
            <span>API 목록</span>
          </div>
          <Button type="button">닫기</Button>
        </div>
        <div className="flex gap-4 items-center">
          <TextInput placeholder="API 목록검색 (예시 : GET /api/v1/users)"></TextInput>
          <Button type="button">설정 초기화</Button>
          <ToggleSwitch
            checked={isAllChecked}
            onChange={(checked) => {
              if (checked) {
                localStorage.setItem(
                  "mock-gui-storage",
                  JSON.stringify({ isAllOn: true })
                );
              } else {
                localStorage.setItem(
                  "mock-gui-storage",
                  JSON.stringify({ isAllOn: false })
                );
              }

              window.location.reload();
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          {Object.entries(cases).map(([apiPath, caseObj]) => {
            return (
              <div key={apiPath}>
                <div className="flex gap-2 justify-between">
                  <div className="flex gap-2">
                    <strong>{apies[apiPath].method}</strong>
                    <strong>{apiPath}</strong>
                  </div>
                  <Select
                    onChange={(e) => {
                      const selectedCase = e.target.value;
                      onChangeSelectCase(apiPath, selectedCase);
                      window.location.reload();
                    }}
                    value={mocks[apiPath]?.selectedCase || "default"}
                  >
                    {Object.keys(caseObj).map((caseKey, index) => {
                      const caseInfo = caseObj[caseKey];
                      return (
                        <option key={index} value={caseKey}>
                          {caseInfo.label}
                        </option>
                      );
                    })}
                  </Select>
                </div>
                <div>
                  <span>{apies[apiPath].detail}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FirstKim;
