<script lang="ts">
  import Home from "$lib/components/Home.svelte";
  import Login from "$lib/components/Login.svelte";
  import { Link, Route, Router, navigate } from "svelte-routing";
  import { user, type User } from "$lib/stores/userStore";
  import * as DDM from "$lib/components/ui/dropdown-menu";
  import { Toaster, toast } from "svelte-sonner";
  import { onMount } from "svelte";
  import Readers from "$lib/components/Readers.svelte";

  const logout = () => {
    localStorage.removeItem("user");
    user.set({} as User);
    navigate("/login");
    toast.success("Succes!", {
      description: "Successfully logged out!",
      position: "top-center",
      duration: 3000,
    });
  };

  onMount(() => {
    if (localStorage.getItem("user"))
      user.set(JSON.parse(localStorage.getItem("user")!));
  });
</script>

<Toaster />
<Router>
  <nav>
    <Link class="nav-link" to="/">Home</Link>
    <Link class="nav-link" to="/readers">Readers</Link>
    {#if $user.name}
      <Link class="ml-auto" to="/">
        <DDM.Root>
          <DDM.Trigger>{$user.name}</DDM.Trigger>
          <DDM.Content>
            <DDM.Item on:click={logout}>Logout</DDM.Item>
          </DDM.Content>
        </DDM.Root>
      </Link>
    {:else}
      <Link class="ml-auto" to="/login">Login</Link>
    {/if}
  </nav>
  <div>
    <Route path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/readers" component={Readers} />
  </div>
</Router>

<style>
  nav {
    font-family: "Comic Sans MS";
    font-size: large;
    display: flex;
    background-color: whitesmoke;
  }
</style>
