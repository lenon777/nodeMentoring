export const startReverse = () => {
  process.stdin.on("data", (data) =>
    process.stdout.write(data.reverse() + "\n")
  );
};
