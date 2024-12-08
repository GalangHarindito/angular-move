interface TypeMenuNavbar {
  signIn?: MenuNavbarMember[];
  signOut: MenuNavbar[];
}

interface MenuNavbar {
  id: number;
  title: string;
  route: string;
}

interface MenuNavbarMember {
  id: number;
}

export const menuNavbar: TypeMenuNavbar = {
  signOut: [
    {
      id: 1,
      title: 'Products',
      route: 'products',
    },
    {
        id: 2,
        title: 'Plans',
        route: 'plans',
      },
    {
      id: 3,
      title: 'About Us',
      route: 'about',
    },
    {
        id: 4,
        title: 'Sign In',
        route: '/signin',
      },
  ],
};
