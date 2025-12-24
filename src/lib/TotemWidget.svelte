<script lang="ts">
import { totem } from './totemStore';
import { updateTotem } from './totemService';

$effect(() => {
  updateTotem();
});

const t = totem;
</script>

<style>
.totem-widget {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #fffbe6;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.totem-visual {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
  box-shadow: 0 0 30px 10px rgba(255, 215, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background: linear-gradient(135deg, #ffe066, #fffbe6);
  transition: box-shadow 0.3s, background 0.3s;
}
.totem-visual[data-stage="5"] { background: linear-gradient(135deg, #ffd700, #fffbe6); box-shadow: 0 0 40px 20px #ffd700; }
.totem-visual[data-stage="4"] { background: linear-gradient(135deg, #ffe066, #fffbe6); box-shadow: 0 0 30px 10px #ffe066; }
.totem-visual[data-stage="3"] { background: linear-gradient(135deg, #ffe066, #fffbe6); box-shadow: 0 0 20px 8px #ffe066; }
.totem-visual[data-stage="2"] { background: linear-gradient(135deg, #fffbe6, #ffe066); box-shadow: 0 0 10px 4px #ffe066; }
.totem-visual[data-stage="1"] { background: linear-gradient(135deg, #fffbe6, #fffbe6); box-shadow: 0 0 5px 2px #ffe066; }
.totem-visual[data-stage="0"] { background: #f0f0f0; box-shadow: none; }
.totem-label {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
</style>

<div class="totem-widget">
  <div class="totem-visual" data-stage={$t.evolutionStage} style="filter: brightness({0.7 + $t.glowIntensity/200}); opacity: {0.7 + $t.pulse/200};">
    🗿
  </div>
  <div class="totem-label">Totem: Steg {$t.evolutionStage}</div>
  <div>Glow: {$t.glowIntensity}</div>
  <div>Pulse: {$t.pulse}</div>
  <div>Fragmentation: {$t.fragmentation}</div>
</div>
