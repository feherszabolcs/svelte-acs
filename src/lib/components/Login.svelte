<script>
  import Input from "./ui/input/input.svelte";
  import Label from "./ui/label/label.svelte";
  import Button from "./ui/button/button.svelte";
  import { toast, Toaster } from "svelte-sonner";
  import { user } from "$lib/stores/userStore";
  import { navigate } from "svelte-routing";

  let username = "";
  let password = "";

  const login = () => {
    if (username == "" || password == "") {
      toast.error("Error!", {
        description: "Please fill in all fields!",
        position: "top-center",
        duration: 3000,
      });
    } else {
      fetch("https://acs.jedlik.cloud/login", {
        method: "POST",
        body: JSON.stringify({ loginName: username, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res));
          user.set(res);
        })
        .then(() => navigate("/"))
        .then(() => {
          toast.success("Success!", {
            description: "Successfully logged in!",
            position: "top-center",
            duration: 3000,
          });
        });
    }
  };
</script>

<Toaster />
<div class="container rounded-md">
  <h2 class="mt-2 w-full">Login</h2>
  <div class="mt-12 flex w-full max-w-sm flex-col gap-1.5">
    <Label for="username">Username</Label>
    <Input
      type="email"
      id="username"
      bind:value={username}
      placeholder="Username"
      required
    />
  </div>
  <div class="mt-10 flex w-full max-w-sm flex-col gap-1.5">
    <Label for="password">Password</Label>
    <Input
      bind:value={password}
      type="password"
      id="password"
      placeholder="Username"
      required
    />
  </div>
  <Button class="mt-10" variant="default" on:click={login}>Login</Button>
</div>

<style>
  .container {
    position: absolute;
    width: 50vw;
    height: 40vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: wheat;
    border-radius: 20px;
  }
  h2 {
    text-align: left;
    font-family: "Comic Sans MS";
    font-size: x-large;
  }
</style>
