<script lang="ts">
    import {Collapse,Navbar,NavbarToggler,Nav,NavLink,NavbarBrand,NavItem,Image,Button} from 'sveltestrap';
    let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
    </script>

<Navbar class="hd-navbar" light expand="md">
    <NavbarBrand href="/">
      <Image class="brand" src="/fourth_logo.png"/>
    </NavbarBrand>
    <NavbarToggler on:click={toggle} class="me-2" />
    <Collapse {isOpen} navbar expand="md">
      <Nav class="ms-auto" navbar>
        <NavItem>
          {#if !isOpen}
          <button id="logout" class="hd-button">Logout <i class="fa fa-sign-out" aria-hidden="true"></i></button>
        {:else}
        <NavLink id="logout">Logout</NavLink>
        {/if}
        </NavItem>
      </Nav>
   </Collapse>
  </Navbar>

  <svelte:head>
    <link rel="stylesheet" href="/restructured_css/navbar.css">
    <link rel="stylesheet" href="/restructured_css/button.css">
    <script src="/specific_page_js/navbar.js"></script>
  </svelte:head>