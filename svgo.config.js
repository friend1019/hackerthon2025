// svgo.config.js (SVGO v3용)
module.exports = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // 반응형 깨지지 않게 viewBox 유지
          removeViewBox: false,
          // 수치/경로 정밀도 낮춰 용량 절감 (보수적으로)
          cleanupNumericValues: { floatPrecision: 2 },
          convertPathData: { floatPrecision: 2 },
          // 필요하면 Id 정리/축약 끄기
          // cleanupIds: false,
        },
      },
    },
    // 추가로 유용한 플러그인들
    'removeDimensions', // width/height 제거하고 viewBox만 남김(반응형)
    'sortAttrs',        // 속성 정렬(캐시/디프에 유리)
    // ID 충돌 방지하고 싶다면(제거/축약 대신 prefix)
    // { name: 'prefixIds', params: { prefix: 'svg-', delim: '-' } },
  ],
};
