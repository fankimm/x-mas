import Head from "next/head";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "asdf_url";
const supabaseKey =
  process.env.PUBLIC_NEXT_SUPABASE_KEY ||
  process.env.SUPABASE_KEY ||
  "asdf_key";
const supabase = createClient(supabaseUrl, supabaseKey);
const getData = async () => {
  const res = await supabase.from("messages").select("*");
  return res;
};
const Leaf = styled.div`
  ${(props) => {
    if (props.children === "*") {
      return `
        font-size:50px;
        width: 10px;
        height: 20px;
        padding: 4px;
        display: flex;
        color: ${props.color};
        justify-content: center;
        align-items: center;
        &:hover{
          transition:0.3s all;
          cursor:pointer;
          font-size:70px;
          -webkit-text-stroke: 2px #ffdc73;
        }
  `;
    } else {
      return `
        width: 10px;
        height: 20px;
        padding: 4px;
        display: flex;
        color: ${props.color};
        justify-content: center;
        transition:0.3s all;
        align-items: center;`;
    }
  }}
  &:hover {
    ${(props) => {
      if (props.children === "^") {
        return `  background: rgb(3, 120, 20);
    border-radius: 10px;
    cursor: pointer;`;
      }
    }}
  }
`;
export default function Home() {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_SUPABASE_KEY);
    console.log(process.env.SUPABASE_KEY);
    console.log("TEST_KEY", process.env.TEST_KEY);
    getData().then((res) => {
      const { data } = res;
      const temp = [...tree];
      data?.forEach((item) => {
        const { rowIdx, colIdx, shape } = item;
        temp[rowIdx][colIdx] = shape;
      });
      setTree(temp);
    });
  });
  const START = 1;
  const END = 38;
  let treeMap: number[][] = [];
  for (let i = 0; i <= END / 2; i++) {
    treeMap.push([]);
  }
  for (let i = START; i < END; i += 2) {
    let mok = Math.floor(i / 2) + 1;
    for (let j = 0; j < (END - i) / 2; j++) {
      treeMap[mok].push(0);
    }

    for (let j = 0; j < i; j++) {
      if (i === 1) {
        treeMap[mok].push(1);
      } else {
        treeMap[mok].push(2);
      }
    }
  }
  const base: number[] = [];
  for (let i = 0; i < END / 2; i++) {
    base.push(0);
  }
  base.push(3);
  base.push(3);
  for (let i = 0; i < 4; i++) {
    treeMap.push(base);
  }
  const [tree, setTree] = useState(treeMap);
  const [form, setForm] = useState({
    msgInput: "",
  });
  const [visible, setVisible] = useState(false);
  // //test code
  // treeMap[7][20] = 4;
  // treeMap[7][23] = 5;
  // treeMap[9][17] = 5;
  // treeMap[11][20] = 6;
  // treeMap[14][13] = 7;
  // //testcode

  const mapRender = (val: number) => {
    switch (val) {
      case 0:
        return " ";
      case 1:
        return "*";
      case 2:
        return "^";
      case 3:
        return "|";
      case 4:
        return "o";
      case 5:
        return "#";
      case 6:
        return "&";
      case 7:
        return "@";
      case 8:
        return "+";
    }
  };
  const makeRandomColor = (val: number) => {
    switch (val) {
      case 0:
        return "silver";
      case 1:
        return "red";
      case 2:
        return "blue";
      case 3:
        return "gold";
      case 4:
        return "orange";
      case 5:
        return "purple";
    }
  };
  const mapColorRender = (val: number) => {
    switch (val) {
      case 0:
        return;
      case 1:
        return "gold";
      case 2:
        return "rgb(0,179,61)";
      case 3:
        return "rgb(109,83,62)";
      default:
        const color = makeRandomColor(Math.floor(Math.random() * 5));
        return color;
    }
  };
  return (
    <>
      <Head>
        <title>CHRISTMAS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {visible ? (
        <>
          <div
            style={{
              padding: "10px",
              position: "fixed",
              top: "10%",
              left: "calc(50% - 200px)",
              background: "white",
              width: "400px",
              height: "200px",
              borderRadius: "10px",
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
          >
            모달 테스트
            <button
              onClick={() => {
                setVisible(false);
              }}
            >
              x
            </button>
            <input
              onChange={(e) => {
                console.log(e.target.value);
                setForm({
                  msgInput: e.target.value,
                });
              }}
            ></input>
            <button
              onClick={() => {
                console.log(form);
                setVisible(false);
              }}
            >
              확인
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className={styles.main}>
        <div style={{ margin: "30px" }}></div>
        <div
          style={{
            width: "500px",
            borderRadius: "20px",
            padding: "20px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="message"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "60px",
              fontSize: "14px",
            }}
          >
            <h1>🎄 MERRY CRHISTMAS 🎄</h1>
            <h2>AND</h2>
            <h1>HAPPY NEW YEAR</h1>
          </div>
          <div
            className="tree"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: "80px",
            }}
          >
            {tree.map((row, rowIdx) => {
              const rowKey = `row_${rowIdx}`;
              return (
                <div
                  key={rowKey}
                  style={{
                    display: "flex",
                  }}
                >
                  {row.map((col, colIdx) => {
                    const colKey = `col_${colIdx}`;
                    return (
                      <Leaf
                        key={colKey}
                        color={mapColorRender(col)}
                        onClick={async () => {
                          if (col === 2) {
                            // setVisible(true);
                            const shape = Math.floor(Math.random() * 4) + 4;
                            const { error } = await supabase
                              .from("messages")
                              .insert({
                                message: "test2",
                                shape,
                                rowIdx,
                                colIdx,
                              });
                            if (!error) {
                              let temp = [...tree];
                              temp[rowIdx][colIdx] = shape;
                              setTree(temp);
                            }
                          }
                        }}
                      >
                        {mapRender(col)}
                      </Leaf>
                      // <div
                      //   className={styles.treeCol}
                      //   key={colKey}
                      //   style={{
                      //     width: "10px",
                      //     height: "20px",
                      //     padding: "4px",
                      //     display: "flex",
                      //     color: mapColorRender(col),
                      //     justifyContent: "center",
                      //     alignItems: "center",
                      //   }}
                      // >
                      //   {mapRender(col)}
                      // </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div
            style={{
              height: "30vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>빈 트리를 눌러 메시지를 작성해주세요</div>
            <div>덕담 좋습니다</div>
            <div>새해인사 좋습니다</div>
            <h3 style={{ margin: "50px" }}>
              메시지는 12월 25일에 공개됩니다 🎅
            </h3>
          </div>
          <div className={styles.footer}>
            <p>우 와 퍼플아이오 짱</p>
            <p>이게 뭔가요? 재밌네요</p>
            <p>다들 새해 복 많이받고 건강하세요</p>
            <p>WMS 1149</p>
            <p>안녕하세요</p>
            <p>hello world</p>
            <p>나는 쌔삥 보세를 입어도 썌삥</p>
            <p>작업 영역에서 문제가 발견되지 않았습니다.</p>
            <p>asdf</p>
            <p>메시지 작성하기 어렵다</p>
            <p>크리스마스 행복행복</p>
            <p>가즈아!!</p>
            <p>떡볶이 먹고싶다...</p>
            <p>새해복 많이 받으세요!!!!</p>
            <p>p</p>
          </div>
        </div>
        <div className="footer" style={{ margin: "80px", color: "white" }}>
          <div>Copyright © 2022 Kim Jihwan. All rights reserved.</div>
        </div>
      </div>
    </>
  );
}
