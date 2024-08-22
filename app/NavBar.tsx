"use client"; 
import { Skeleton } from "@/app/components";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = ({ toggleTheme, theme }: { toggleTheme: () => void, theme: "light" | "dark" }) => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
             <NavLinks theme={theme} />
          </Flex>
          <Flex align="center" gap="5">
            <button
              onClick={toggleTheme}
              className="nav-link theme-toggle"
            >
              {theme === "dark" ?
                <SunIcon width={20} height={20} /> :
                <MoonIcon width={20} height={20} />
              }
            </button>
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = ({ theme }: { theme: "light" | "dark" }) => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <ul className="flex space-x-6">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            className={classnames({
              "nav-link": true,
              "nav-link-active": link.href === currentPath,
              "nav-link-light": theme === "light",
              "nav-link-dark": theme === "dark",
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") {
    return <Skeleton width="3rem" />;
  }

  if (status === "unauthenticated") {
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );
  }
  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user?.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Log Out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default NavBar;