"use client";

import { Check, Loader2 } from "lucide-react";
import { useActionState, useEffect, useState, type ReactNode } from "react";

import { enviarOrcamento } from "@/app/actions";
import { AMBIENTES_FORM } from "@/content/servicos";
import { CONTATO, site } from "@/content/site";
import type { CampoOrcamento, EstadoOrcamento } from "@/lib/validacao";
import { mascararTelefone } from "@/lib/whatsapp";

const INICIAL: EstadoOrcamento = { status: "inicial" };
const ERRO = "mt-2 text-[0.88rem] text-[#a3361e]";
const campo =
  "mt-2 block min-h-12 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 aria-[invalid=true]:border-[#a3361e]";

function Campo({ id, rotulo, erro, opcional, children }: { id: string; rotulo: string; erro?: string; opcional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-[0.92rem] font-semibold text-ink">
        {rotulo}
        {opcional ? <span className="font-normal text-muted"> (opcional)</span> : null}
      </label>
      {children}
      {erro ? (
        <p id={`${id}-erro`} className={ERRO}>
          {erro}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Quatro campos e um honeypot. Server Action + Zod no servidor, estados
 * pelo useActionState: botão em loading, erro específico abaixo do campo e
 * sucesso no lugar do formulário. Na prévia estática a action devolve um
 * link de WhatsApp com o pedido escrito, que é aberto aqui.
 */
export function FormularioContato() {
  const [estado, acao, enviando] = useActionState(enviarOrcamento, INICIAL);
  const [telefone, setTelefone] = useState("");
  const erros = estado.status === "erro" ? estado.erros : {};
  const valor = (k: string) => (estado.status === "erro" ? estado.valores[k] : undefined);

  useEffect(() => {
    if (estado.status === "ok" && estado.whatsapp) window.open(estado.whatsapp, "_blank", "noopener");
  }, [estado]);

  if (estado.status === "ok") {
    return (
      <div role="status" className="rounded-[1.25rem] bg-surface-soft p-2">
        <Check aria-hidden className="size-8 text-brand" strokeWidth={2} />
        <p className="mt-4 text-[1.6rem] font-extrabold tracking-[-0.03em] text-ink">{CONTATO.sucessoTitulo}</p>
        <p className="mt-2 text-muted">{CONTATO.sucessoTexto}</p>
        <a href={`tel:${site.whatsapp}`} className="mt-5 inline-block font-semibold text-brand underline underline-offset-4">
          {site.whatsappDisplay}
        </a>
      </div>
    );
  }

  const aria = (k: CampoOrcamento) => ({
    id: `orc-${k}`,
    name: k,
    "aria-invalid": erros[k] ? true : undefined,
    "aria-describedby": erros[k] ? `orc-${k}-erro` : undefined,
  });

  return (
    <form action={acao} noValidate className="grid gap-5">
      <Campo id="orc-nome" rotulo="Nome" erro={erros.nome}>
        <input {...aria("nome")} type="text" autoComplete="name" defaultValue={valor("nome")} className={campo} />
      </Campo>
      <Campo id="orc-whatsapp" rotulo="WhatsApp" erro={erros.whatsapp}>
        <input
          {...aria("whatsapp")}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(24) 99999-9999"
          value={telefone || valor("whatsapp") || ""}
          onChange={(e) => setTelefone(mascararTelefone(e.target.value))}
          className={campo}
        />
      </Campo>
      <Campo id="orc-ambiente" rotulo="Ambiente de interesse" erro={erros.ambiente}>
        <select {...aria("ambiente")} defaultValue={valor("ambiente") ?? ""} className={campo}>
          <option value="" disabled>
            Escolha o ambiente
          </option>
          {AMBIENTES_FORM.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </Campo>
      <Campo id="orc-mensagem" rotulo="Mensagem" erro={erros.mensagem} opcional>
        <textarea {...aria("mensagem")} rows={3} maxLength={600} defaultValue={valor("mensagem")} placeholder="Medidas, prazo, o que já tem em mente" className={`${campo} resize-y`} />
      </Campo>
      {/* Honeypot: fora da tela e fora do teclado. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="orc-empresa">Empresa</label>
        <input id="orc-empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" disabled={enviando} className="btn btn-madeira h-14 w-full text-base disabled:opacity-70">
        {enviando ? <Loader2 aria-hidden className="size-5 animate-spin" /> : null}
        {enviando ? "Enviando" : CONTATO.enviar}
      </button>
    </form>
  );
}
