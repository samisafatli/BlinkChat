import styles from "./page.module.css";
import { Container } from "@mui/material";
import Header from "./Components/Header/Header";
import MainBox from "./Components/MainBox/MainBox";

export default function Home() {
  return (
    <main>
      <Container>
        <Header></Header>
        <MainBox></MainBox>
      </Container>
    </main>
  );
}
