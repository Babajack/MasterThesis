import React from "react";
import { render } from "@testing-library/react";
import UserDashboard from "../src/UserDashboard";

test("renders user subscription type", () => {
	const userWithSubscription = { subscription: "Premium" };
	const { getAllByText } = render(<UserDashboard user={userWithSubscription} />);
	expect(getAllByText(/Premium/i).length).toBeGreaterThanOrEqual(1);
});

test("renders no subscription message", () => {
	const userWithoutSubscription = {};
	const { getAllByText } = render(<UserDashboard user={userWithoutSubscription} />);
	expect(getAllByText(/No subscription/i).length).toBeGreaterThanOrEqual(1);
});

test("renders user online status", () => {
	const onlineUser = { isOnline: true };
	const { getAllByText } = render(<UserDashboard user={onlineUser} />);
	expect(getAllByText(/Online/i).length).toBeGreaterThanOrEqual(1);
});

test("renders user offline status", () => {
	const offlineUser = { isOnline: false };
	const { getAllByText } = render(<UserDashboard user={offlineUser} />);
	expect(getAllByText(/Offline/i).length).toBeGreaterThanOrEqual(1);
});

test("renders welcome message with username", () => {
	const namedUser = { username: "Alice" };
	const { getAllByText } = render(<UserDashboard user={namedUser} />);
	expect(getAllByText(/Welcome, Alice!/i).length).toBeGreaterThanOrEqual(1);
});

test("renders welcome message for guest", () => {
	const guestUser = {};
	const { getAllByText } = render(<UserDashboard user={guestUser} />);
	expect(getAllByText(/Welcome, guest!/i).length).toBeGreaterThanOrEqual(1);
});

test("renders admin controls for admin user", () => {
	const adminUser = { isAdmin: true };
	const { getAllByText } = render(<UserDashboard user={adminUser} />);
	expect(getAllByText(/Admin Controls/i).length).toBeGreaterThanOrEqual(1);
});

test("does not render admin controls for non-admin user", () => {
	const regularUser = { isAdmin: false };
	const { queryByText } = render(<UserDashboard user={regularUser} />);
	expect(queryByText(/Admin Controls/i)).toBeNull();
});

test("renders premium badge for premium subscription users", () => {
	const premiumUser = { subscription: "premium" };
	const { getAllByText } = render(<UserDashboard user={premiumUser} />);
	expect(getAllByText(/PREMIUM/i).length).toBeGreaterThanOrEqual(1);
});

test("does not render premium badge for non-premium subscription users", () => {
	const nonPremiumUser = { subscription: "basic" };
	const { queryByText } = render(<UserDashboard user={nonPremiumUser} />);
	expect(queryByText(/PREMIUM/i)).toBeNull();
});
