import FirstKim from "./components/kim/FirstKim";

const App = () => {
  return (
    <div>
      <p>Hello, World!</p>
      <FirstKim
        apies={{
          "/api/v1/users": {
            method: "GET",
            detail: "사용자 목록 조회 API",
          },
          "/api/v1/users/{id}": {
            method: "GET",
            detail: "특정 사용자 조회 API",
          },
        }}
        cases={{
          "/api/v1/users": {
            default: {
              label: "기본 케이스",
            },
            error: {
              label: "오류 케이스",
            },
          },
          "/api/v1/users/{id}": {
            default: {
              label: "기본 케이스",
            },
            notFound: {
              label: "사용자 없음",
            },
          },
        }}
        mocks={{
          "/api/v1/users": {
            isOn: false,
            selectedCase: "default",
          },
          "/api/v1/users/{id}": {
            isOn: false,
            selectedCase: "default",
          },
        }}
        onChangeSelectCase={(apiPath, selectedCase) => {
          console.log(`API 경로: ${apiPath}, 선택된 케이스: ${selectedCase}`);
        }}
      />
    </div>
  );
};

export default App;
