import { screen } from "@testing-library/react";
import { vi } from "vitest";

import render from "@/utils/test/render";
import { ErrorPage } from "../ErrorPage";
import { useNavigate } from "react-router-dom";

// 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행 (react-router-dom의 useNavigate 모킹)
vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

it('"뒤로 이동" 버튼 클릭시 뒤로 이동하는 navigate(-1) 함수가 호출된다', async () => {
  // Arrange: ErrorPage 컴포넌트를 렌더링
  const navigate = vi.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigate);
  const { user } = await render(<ErrorPage />);

  // Act: "뒤로 이동" 버튼을 클릭
  const backButton = screen.getByText("뒤로 이동");
  await user.click(backButton);

  // Assert: navigate 함수가 -1 인자로 호출되었는지 확인
  expect(navigate).toHaveBeenCalledWith(-1);
});
