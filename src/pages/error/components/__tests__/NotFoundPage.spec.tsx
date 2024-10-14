import { screen } from "@testing-library/react";
import { vi } from "vitest";
import render from "@/utils/test/render";
import { NotFoundPage } from "@/pages/error/components/NotFoundPage";
import { useNavigate } from "react-router-dom";

// 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행 (react-router-dom의 useNavigate 모킹)
vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

it("Home으로 이동 버튼 클릭시 홈 경로로 이동하는 navigate가 실행된다", async () => {
  // Arrange: NotFoundPage 컴포넌트를 렌더링
  const navigate = vi.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigate);

  const { user } = await render(<NotFoundPage />);

  // Act: "Home으로 이동" 버튼을 클릭
  const homeButton = screen.getByText("Home으로 이동");
  await user.click(homeButton);

  // Assert: navigate 함수가 '/' 경로와 { replace: true } 옵션으로 호출되었는지 확인
  expect(navigate).toHaveBeenCalledWith("/", { replace: true });
});
